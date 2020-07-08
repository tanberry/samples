# Getting Started with Terraform

Terraform is a tool for defining and provisioning infrastructure as code (IaC) in a wide-range of environments, using a language known as HashiCorp Configuration Language (HCL).  

This quick-start topic is intended to help you learn the basics of getting started with Terraform. Following the steps below, you will create a configuration file using pre-defined resources in a Docker container, intialize and verify your instance, deploy the resources, and then destroy the infrastructure. 

## Prerequisites

To complete the steps in this topic you need to install Terraform and Docker.

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

TIP: You can use the `terraform validate` command to parse your **main.tf** file and validate the contents. 

## Verify your installation

4. Initialize Terraform with the `init` command. 

```shell
$ terraform init
```

5. Next, run the `plan` command to create the execution plan, or the set of changes, that are required to build the defined infrastructure. 

```shell
$ terraform plan
```
You can review the displayed plan to verify that the tasks shown are the appropriate actions to provision your infrastructure.

## Provision the infrastructure

6. After verifying that Terraform initialised successfully and generated an execution plan, use the `apply` command to provision the resource with the infrastructure objects that are defined in the plan.

```shell
$ terraform apply
```

7. Type `yes` and press ENTER at the confirmation prompt. The command will take several minutes to run. A message displays with the number of created resources.

TIP: You can use the `terraform state list` command to see the names of the resources.

## Destroy the infrastrucutre

8. To terminate all resources of the infrastructure, use the `destroy` command.

```shell
$ terraform destroy
```
 
 9. Type `yes` and press ENTER. Terraform then destroys the resources.

# Next Steps 

Now that you have successfully used Terraform to provision an infrastructure locally, using Docker, learn more about using Terraform on multi-Cloud environments with 

* Learn more about Terraform [providers](https://www.terraform.io/docs/providers/index.html).

* Review other [use cases](https://www.terraform.io/intro/use-cases.html) with examples of Terraform configurations using multiple providers.
