data "github_repository" "repo" {
  name = var.repository_name
}

resource "github_repository_ruleset" "protect_default_branch" {
  repository  = data.github_repository.repo.name
  name        = "Protect default branch"
  target      = "branch"
  enforcement = var.branch_protection.enforcement

  conditions {
    ref_name {
      include = ["~DEFAULT_BRANCH"]
      exclude = []
    }
  }

  dynamic "bypass_actors" {
    for_each = var.branch_protection.bypass_actors
    content {
      actor_type  = bypass_actors.value.actor_type
      actor_id    = bypass_actors.value.actor_id
      bypass_mode = bypass_actors.value.bypass_mode
    }
  }

  rules {
    creation                = var.branch_protection.rules.creation
    update                  = var.branch_protection.rules.update
    deletion                = var.branch_protection.rules.deletion
    non_fast_forward        = var.branch_protection.rules.non_fast_forward
    required_linear_history = var.branch_protection.rules.required_linear_history

    pull_request {
      required_approving_review_count   = var.branch_protection.rules.pull_request.required_approving_review_count
      dismiss_stale_reviews_on_push     = var.branch_protection.rules.pull_request.dismiss_stale_reviews_on_push
      require_code_owner_review         = var.branch_protection.rules.pull_request.require_code_owner_review
      require_last_push_approval        = var.branch_protection.rules.pull_request.require_last_push_approval
      required_review_thread_resolution = var.branch_protection.rules.pull_request.required_review_thread_resolution
    }
  }
}
