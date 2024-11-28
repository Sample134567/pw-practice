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