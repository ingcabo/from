data "aws_route53_zone" "domain" {
  name  = "${var.environment}-media-admin.easy.com.ar"
}

resource "aws_route53_record" "default" {
  zone_id = "${data.aws_route53_zone.domain.zone_id}"
  name    = "${element(var.dns_names, 0)}"
  type    = "A"

  alias {
    name                   = "${aws_cloudfront_distribution.default.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.default.hosted_zone_id}"
    evaluate_target_health = "false"
  }
}