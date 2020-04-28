output "codebuild_role_arn" {
  description = "IAM Role ARN"
  value       = "${module.build.role_arn}"
}

output "label_id" {
  description = "Label ID for resources"
  value       = "${module.default-label.id}"
}
