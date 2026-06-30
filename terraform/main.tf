variable "repository_name" {
  description = "Name of the existing GitHub repository"
  type        = string
}

variable "branch_protection" {
  description = "Branch protection ruleset settings"
  type = object({
    enforcement = optional(string, "active")
    bypass_actors = optional(list(object({
      actor_type  = string
      actor_id    = number
      bypass_mode = string
    })), [])
    rules = object({
      creation                = optional(bool, false)
      update                  = optional(bool, true)
      deletion                = optional(bool, true)
      non_fast_forward        = optional(bool, true)
      required_linear_history = optional(bool, false)
      pull_request = optional(object({
        required_approving_review_count   = optional(number, 1)
        dismiss_stale_reviews_on_push     = optional(bool, true)
        require_code_owner_review         = optional(bool, false)
        require_last_push_approval        = optional(bool, false)
        required_review_thread_resolution = optional(bool, false)
      }), {})
    })
  })
}

module "github" {
  source = "./github"

  repository_name   = var.repository_name
  branch_protection = var.branch_protection
}