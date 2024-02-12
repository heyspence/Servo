class AdminMailerPreview < ActionMailer::Preview
    def new_user
      user = User.last
      AdminMailer.new_user(user)
    end
end