Feature: WebdriverUniversity.com
        Scenario: Valid Contact Us Form Submission
                Given I navigate to WebdriverUniversity homepage
                When I Click on the contact us button
                And I switch to new browser tab
                And I type a first name
                And I type a last name
                And I enter an email address
                And I Type a comment
                And I click on the submit button
                Then I should be presented with a succesful contact us submission message

        Scenario: Invalid Contact Us form Submission
                Given I navigate to WebdriverUniversity homepage
                When I Click on the contact us button
                And I switch to new browser tab
                And I type a first name
                And I type a last name
                And I Type a comment
                Then I should be presented with a unsuccesful contact us message

        Scenario: Valid Contact Us Form Submission - Using specific Data
                Given I navigate to WebdriverUniversity homepage
                When I Click on the contact us button
                And I switch to new browser tab
                And I type a specific first name "Sarah"
                And I type a Specific last name "Woods" 
                And I enter a specific email address "sarah_woods@example.com"
                And I Type a specific text "Hello World" and a number 2 within the comment input field
                And I click on the submit button
                Then I should be presented with a succesful contact us submission message
