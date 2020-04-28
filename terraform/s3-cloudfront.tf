# S3 Bucket
resource "aws_cloudfront_origin_access_identity" "default" {
  comment = "${module.label.id}"
}

data "aws_s3_bucket" "selected" {
  bucket = "${local.bucket == "" ? var.static_s3_bucket : local.bucket}"
}

locals {
  bucket         = "${join("", compact(concat(list(var.origin_bucket), concat(list(""), aws_s3_bucket.origin.*.id))))}"
  bucket_website = "${join("", compact(concat(list(var.origin_bucket), concat(list(""), aws_s3_bucket.origin.*.website_endpoint))))}"
}

data "aws_iam_policy_document" "origin" {
  statement {
    sid       = "AllowCFOriginAccess"
    actions   = ["s3:GetObject"]
    resources = ["arn:aws:s3:::$${bucket_name}$${origin_path}*"]

    condition {
      test     = "StringEquals"
      variable = "aws:UserAgent"

      values = ["${var.cloudfront_secret_header}"]
    }

    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }
}

data "template_file" "default" {
  template = "${data.aws_iam_policy_document.origin.json}"

  vars {
    origin_path = "${coalesce(var.origin_path, "/")}"
    bucket_name = "${local.bucket}"
  }
}

resource "aws_s3_bucket_policy" "default" {
  bucket = "${local.bucket}"
  policy = "${data.template_file.default.rendered}"
}

resource "aws_s3_bucket" "origin" {
  count         = "${signum(length(var.origin_bucket)) == 1 ? 0 : 1}"
  bucket        = "${module.label.id}"
  acl           = "private"
  tags          = "${module.label.tags}"
  force_destroy = "${var.origin_force_destroy}"
  region        = "${var.region}"

  cors_rule {
    allowed_headers = "${var.cors_allowed_headers}"
    allowed_methods = "${var.cors_allowed_methods}"
    #allowed_origins = "${sort(distinct(compact(concat(var.cors_allowed_origins, var.dns_names ))))}"
    allowed_origins = "${var.cors_allowed_origins}"
    expose_headers  = "${var.cors_expose_headers}"
    max_age_seconds = "${var.cors_max_age_seconds}"
  }

  website = {
    index_document = "index.html"
  }
}

#data "aws_acm_certificate" "default" {
 # domain   = "*.easy.com.ar"

#}

# Cloudfront Distribution
resource "aws_cloudfront_distribution" "default" {
  enabled             = "${var.enabled}"
  is_ipv6_enabled     = "${var.is_ipv6_enabled}"
  comment             = "${var.comment}"
  default_root_object = "${var.default_root_object}"
  price_class         = "${var.price_class}"
  depends_on          = ["aws_s3_bucket.origin"]

  #aliases = ["${var.dns_names}"]

  origin {
    domain_name = "${local.bucket_website}"
    origin_id   = "${module.label.id}"
    origin_path = "${var.origin_path}"

    custom_origin_config {
      origin_protocol_policy = "http-only"
      http_port              = "80"
      https_port             = "443"
      origin_ssl_protocols   = ["TLSv1.1", "TLSv1.2"]
    }

    # We use a secret to authenticate CF requests to S3 policy.
    custom_header {
      name  = "User-Agent"
      value = "${var.cloudfront_secret_header}"
    }
  }

  custom_error_response {
    error_code            = "404"
    error_caching_min_ttl = "300"
    response_code         = "200"
    response_page_path    = "/index.html"
  }

  viewer_certificate {
     ssl_support_method       = "sni-only"
     minimum_protocol_version = "${var.minimum_protocol_version}"
     #acm_certificate_arn      = "${data.aws_acm_certificate.default.arn}"
     cloudfront_default_certificate = true
  }

  default_cache_behavior {
    allowed_methods  = "${var.allowed_methods}"
    cached_methods   = "${var.cached_methods}"
    target_origin_id = "${module.label.id}"
    compress         = "${var.compress}"
    trusted_signers  = "${var.trusted_signers}"

    forwarded_values {
      query_string = "${var.forward_query_string}"
      headers      = ["${var.forward_header_values}"]

      cookies {
        forward = "${var.forward_cookies}"
      }
    }

    viewer_protocol_policy = "${var.viewer_protocol_policy}"
    default_ttl            = "${var.default_ttl}"
    min_ttl                = "${var.min_ttl}"
    max_ttl                = "${var.max_ttl}"
  }

  restrictions {
    geo_restriction {
      restriction_type = "${var.geo_restriction_type}"
      locations        = "${var.geo_restriction_locations}"
    }
  }

  web_acl_id = "${var.web_acl_id}"

  tags = "${module.label.tags}"
}