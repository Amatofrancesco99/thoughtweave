# Set GITHUB_TOKEN environment variable before running terraform apply

repository_name = "thoughtweave"

branch_protection = {
  enforcement = "active"
  bypass_actors = [
    {
      actor_type  = "RepositoryRole"
      actor_id    = 5
      bypass_mode = "always"
    }
  ]
  rules = {
    creation                = false
    update                  = true
    deletion                = true
    non_fast_forward        = true
    required_linear_history = false
    pull_request = {
      required_approving_review_count   = 1
      dismiss_stale_reviews_on_push     = true
      require_code_owner_review         = false
      require_last_push_approval        = false
      required_review_thread_resolution = false
    }
  }
}
