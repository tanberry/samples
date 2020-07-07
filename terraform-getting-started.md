# Getting Started with Terraform

Terraform is a tool for defining and provisioning infrastructure as code (IaC) on multi-Cloud environemnts, using a language known as HashiCorp Configuration Language (HCL).

This topic explains how to install Terraform, create a configuration file, intialize and verify your instance, deploy your configuration, and then destroy the infrastructure.

## Prerequisites

To install Terraform, go to [Terraform.io](https://www.terraform.io/downloads.html) and download the compressed binary application executable file that is appropriate for your development environment.

## Configure and initialize your environment 

After downloading and installing Terraform, the next step is to create your working directory and a configuration file.

1. Create a new directory on your local machine and navigate to the new directory.

```shell
$ mkdir terraform-demo
$ cd terraform-demo
```

2. Next, create a configuration file named `main.tf`.

```shell
$ touch main.tf
```

3. Add the following lines to the `main.tf` file.

```hcl
provider "docker" {
    host = "unix:///var/run/docker.sock"
}

resource "docker_container" "nginx" {
  image = docker_image.nginx.latest
  name  = "training"
  ports {
    internal = 80
    external = 80
  }
}

resource "docker_image" "nginx" {
  name = "nginx:latest"
}
```

Initialize Terraform with the `init` command. The AWS provider will be installed. 

```shell
$ terraform init
```

Verify that Terraform initialized successfully (and found its config plan?????) by running the `terraform plan` command. TIP: the `plan` command is a useful to check "whether the execution plan for a set of changes matches your expectations without making any changes to real resources or to the state."

```shell
$ terraform plan
```

## Provision Terraform
After verifying that Terraform initialised successfully, provision the resource with the `apply` command.

```shell
$ terraform apply
```

The command will take several minutes to run and display a message indicating that the resource was created.

## Destroy the infrastrucutre

Finally, destroy the infrastructure.

```shell
$ terraform destroy
```
 
 On the confirmation prompt, type `yes` and press ENTER. Terraform then destroys the resources.

# Next Steps
=================TODO==============
