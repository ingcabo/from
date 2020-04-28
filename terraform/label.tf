module "label" {
  source     = "modules/label"
  namespace  = "${var.namespace}"
  stage      = "${var.environment}"
  name       = "${var.name}"
  delimiter  = "${var.delimiter}"
  attributes = ["admin"]
}
