module ApplicationHelper
    def under_construction
        "This page has not been built yet..."
    end

    def auth_token
        "<input type='hidden' 
        name='authenticity_token' 
        value='#{ form_authenticity_token }'>".html_safe
    end
end
