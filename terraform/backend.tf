terraform {
  backend "s3" {
    bucket = "easyar-media-terraform-backend"
    key    = "admin/terraform.tfstate"
    region = "us-east-1"
  }
}
