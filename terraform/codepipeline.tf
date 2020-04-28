module "codecommit-admin" {
  source                    = "./modules/codecommit"
  repo_name                 = "media-server-admin-ar"
  organization_name         = "${var.namespace}"
  repo_default_branch       = "${var.codepipeline_branch}"
  aws_region                = "${var.region}"
  char_delimiter            = "${var.delimiter}"
  environment               = "${var.environment}"
  build_timeout             = "60" 
  build_compute_type        = "BUILD_GENERAL1_SMALL"
  build_image               = "aws/codebuild/docker:18.09.0"
  build_privileged_override = "true"
  test_buildspec            = "buildspec-${var.environment}_test.yml"
  package_buildspec         = "buildspec-${var.environment}.yml"
  force_artifact_destroy    = true
  build_custom_iam_policy = "${data.aws_iam_policy_document.codecommit-admin-custom.json}"
  attributes  = ["admin", "cp"] 
  
}


data "aws_iam_policy_document" "codecommit-admin-custom" {
  # Permissions for writing into target S3 bucket
  statement {
    sid     = "s3list"
    actions = ["s3:List*"]
    effect  = "Allow"

    resources = ["*"]
  }

  statement {
    sid     = "s3write"
    actions = ["s3:Put*", "s3:Get*", "s3:DeleteObject"]
    effect  = "Allow"

    resources = [
      "${aws_s3_bucket.origin.arn}",
      "${aws_s3_bucket.origin.arn}/*",
    ]
  }

  # Permissions for resource creation (quite permissive, be careful)
  statement {
    sid = "resourcecreation"

    actions = [
      "iam:*",
      "cloudfront:*",
      "ec2:*",
      "codebuild:*",
      "codepipeline:*",
      "s3:*",
      "ssm:*",
      "acm:*",
      "elasticloadbalancing:*",
      "autoscaling:*",
      "logs:*",
      "route53:*",
    ]

    effect = "Allow"

    resources = [
      "*",
    ]
  }
}