data "aws_caller_identity" "default" {}

data "aws_region" "default" {}

module "default-label" {
  source     = "../label"
  namespace  = "${var.namespace}"
  stage      = "${var.environment}"
  name       = "${var.name}"
  delimiter  = "${var.delimiter}"
  attributes = ["${var.attributes}"]
}

resource "aws_s3_bucket" "default" {
  bucket = "${module.default-label.id}"
  acl    = "private"
  tags   = "${module.default-label.tags}"
}

# CodePipeline IAM Role
data "aws_iam_policy_document" "default-assume" {
  statement {
    sid = ""

    actions = [
      "sts:AssumeRole",
    ]

    principals {
      type        = "Service"
      identifiers = ["codepipeline.amazonaws.com"]
    }

    effect = "Allow"
  }
}

resource "aws_iam_role" "default" {
  name               = "${module.default-label.id}"
  assume_role_policy = "${data.aws_iam_policy_document.default-assume.json}"
}

data "aws_iam_policy_document" "default" {
  statement {
    sid = ""

    actions = [
      "cloudwatch:*",
      "s3:*",
      "iam:PassRole",
      "logs:PutRetentionPolicy",
    ]

    resources = ["*"]
    effect    = "Allow"
  }
}

resource "aws_iam_policy" "default" {
  name   = "${module.default-label.id}"
  policy = "${data.aws_iam_policy_document.default.json}"
}

resource "aws_iam_role_policy_attachment" "default" {
  role       = "${aws_iam_role.default.id}"
  policy_arn = "${aws_iam_policy.default.arn}"
}

resource "aws_iam_role_policy_attachment" "s3" {
  role       = "${aws_iam_role.default.id}"
  policy_arn = "${aws_iam_policy.s3.arn}"
}

resource "aws_iam_policy" "s3" {
  name   = "${module.default-label.id}-s3"
  policy = "${data.aws_iam_policy_document.s3.json}"
}

data "aws_iam_policy_document" "s3" {
  statement {
    sid = ""

    actions = [
      "s3:GetObject",
      "s3:GetObjectVersion",
      "s3:GetBucketVersioning",
      "s3:PutObject",
    ]

    resources = [
      "${aws_s3_bucket.default.arn}",
      "${aws_s3_bucket.default.arn}/*",
    ]

    effect = "Allow"
  }
}

# CodeBuild
resource "aws_iam_role_policy_attachment" "codebuild" {
  role       = "${aws_iam_role.default.id}"
  policy_arn = "${aws_iam_policy.codebuild.arn}"
}

resource "aws_iam_policy" "codebuild" {
  name   = "${module.default-label.id}-codebuild"
  policy = "${data.aws_iam_policy_document.codebuild.json}"
}

data "aws_iam_policy_document" "codebuild" {
  statement {
    sid = ""

    actions = [
      "codebuild:*",
    ]

    resources = ["${module.build.project_id}"]
    effect    = "Allow"
  }
}

module "build" {
  source                = "../codebuild"
  namespace             = "${var.namespace}"
  name                  = "${var.name}"
  environment           = "${var.environment}"
  build_image           = "${var.build_image}"
  build_compute_type    = "${var.build_compute_type}"
  buildspec             = "${var.buildspec}"
  delimiter             = "${var.delimiter}"
  attributes            = "${concat(var.attributes, list("build"))}"
  tags                  = "${var.tags}"
  privileged_mode       = "${var.privileged_mode}"
  aws_region            = "${signum(length(var.aws_region)) == 1 ? var.aws_region : data.aws_region.default.name}"
  aws_account_id        = "${signum(length(var.aws_account_id)) == 1 ? var.aws_account_id : data.aws_caller_identity.default.account_id}"
  image_repo_name       = "${var.image_repo_name}"
  image_tag             = "${var.image_tag}"
  github_token          = "${var.github_oauth_token}"
  environment_variables = "${var.environment_variables}"
  custom_iam_policy     = "${var.build_custom_iam_policy}"
}

resource "aws_iam_role_policy_attachment" "codebuild_s3" {
  role       = "${module.build.role_arn}"
  policy_arn = "${aws_iam_policy.s3.arn}"
}

# CodePipeline
resource "aws_codepipeline" "source_build_deploy" {
  name     = "${module.default-label.id}"
  role_arn = "${aws_iam_role.default.arn}"

  artifact_store {
    location = "${aws_s3_bucket.default.bucket}"
    type     = "S3"
  }

  stage {
    name = "Source"

    action {
      name             = "Source"
      category         = "Source"
      owner            = "ThirdParty"
      provider         = "GitHub"
      version          = "1"
      output_artifacts = ["code"]

      configuration {
        OAuthToken           = "${var.github_oauth_token}"
        Owner                = "${var.repo_owner}"
        Repo                 = "${var.repo_name}"
        Branch               = "${var.branch}"
        PollForSourceChanges = "${var.poll_source_changes}"
      }
    }
  }

  stage {
    name = "Build"

    action {
      name     = "Build"
      category = "Build"
      owner    = "AWS"
      provider = "CodeBuild"
      version  = "1"

      input_artifacts  = ["code"]
      output_artifacts = ["package"]

      configuration {
        ProjectName = "${module.build.project_name}"
      }
    }
  }
}
