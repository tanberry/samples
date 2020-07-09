# Getting Started with Terraform

Terraform is a tool for defining and provisioning infrastructure as code (IaC) in a wide-range of environments, using a language known as HashiCorp Configuration Language (HCL).  

This quick-start topic is intended to help you learn the basics of getting started with Terraform. Following the steps below, you will create a configuration file using pre-defined resources in a Docker container, initialize and verify your instance, deploy the resources, and then destroy the infrastructure. 

## Prerequisites

To complete the steps in this topic you need to install Terraform and Docker.

* To install Terraform, go to [Terraform.io](https://www.terraform.io/downloads.html) and download the executable file that is appropriate for your development environment. Be sure to define the directory containing the Terraform binary file in your `$PATH`, for example `usr/local/bin`. 

* To install Docker, go to [Docker.com](https://www.docker.com/products/docker-desktop) and download and install Docker Desktop. 

## Configure and initialize your environment 

After installing Terraform and Docker, the next step is to create your working directory and a configuration file.

In your console or terminal, create and navigate to a new directory on your local machine.

```shell
$ mkdir terraform-demo
$ cd terraform-demo
```

Next, create a configuration file named `main.tf`.

```shell
$ touch main.tf
```

Add the following lines to the `main.tf` file. 

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

**TIP**: You can use the `terraform validate` command to parse and validate your **main.tf** file. 

## Verify your installation

Initialize Terraform using the `init` command. 

```shell
$ terraform init
```

Next, run the `plan` command to create the execution plan, or set of changes, that are required to build the defined infrastructure. 

```shell
$ terraform plan
```
You can review the displayed plan to verify that the tasks shown are the appropriate actions to provision your infrastructure.

## Provision the infrastructure

After verifying that Terraform initialised successfully and generated an execution plan, use the `apply` command to provision the infrastructure with the defined resources.

```shell
$ terraform apply
```

Type `yes` and press ENTER at the confirmation prompt. The command takes several minutes to run. A message displays with the number of created resources.

**TIP**: You can use the `terraform state list` command to see the exact names of the resources.

## Destroy the infrastructure

To terminate all resources of the infrastructure, use the `destroy` command.

```shell
$ terraform destroy
```
 
Type `yes` and press ENTER. Terraform then destroys the resources.

# Next Steps 

Now that you can successfully use Terraform with Docker to provision an infrastructure locally, learn more about using Terraform on multi-Cloud environments with other resources and providers.

* Learn more about Terraform [providers](https://www.terraform.io/docs/providers/index.html).

* Review other [use cases](https://www.terraform.io/intro/use-cases.html) with examples of Terraform configurations using multiple providers.
