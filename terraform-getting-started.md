# Getting Started with Terraform

Terraform is a tool for defining and provisioning infrastructure as code (IaC) on multi-Cloud environemnts, using a language known as HashiCorp Configuration Language (HCL).

This topic explains how to install Terraform, create a configuration file, intialize and verify your instance, deploy your configuration, and then destroy the infrastructure.

## Prerequisites

To complete the steps in this topic you need to install Terraform and Docker. Docker is used to 
* To install Terraform, go to [Terraform.io](https://www.terraform.io/downloads.html) and download the compressed binary application executable file that is appropriate for your development environment. Be sure to define the directory containing the Terraform binary file in your `$PATH`, for example `usr/local/bin`. 

* To install Docker, go to [Docker.com](https://www.docker.com/products/docker-desktop) and download and install Docker Desktop. 

## Configure and initialize your environment 

After downloading and installing Terraform and Docker, the next step is to create your working directory and a configuration file.

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

TIP: You can use the `terraform validate` command to parse your `main.tf` file and validate the contents. 

## Verify your installation

Initialize Terraform with the `init` command. 

```shell
$ terraform init
```

Run the `plan` command to create the execution plan, or the set of changes, that are required to achieve the defined infrastructure. 

```shell
$ terraform plan
```

## Provision the infrastructure

After verifying that Terraform initialised successfully, use the `apply` command to provision the resource with the infrastructure objects that are defined in the plan.

```shell
$ terraform apply
```

The command will take several minutes to run and display a message indicating that the resource was created.

## Destroy the infrastrucutre

To terminate all resources of the infrastructure, use the `destroy` command.

```shell
$ terraform destroy
```
 
 On the confirmation prompt, type `yes` and press ENTER. Terraform then destroys the resources.

# Next Steps
=================TODO==============
