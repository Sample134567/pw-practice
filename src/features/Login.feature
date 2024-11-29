Feature: WebdriverUniversity - Login Page

    Scenario Outline: Validate & invalid login
        Given I navigate to WebdriverUniversity homepage
        When I click on the login portal button
        And I switch to new browser tab
        And I type a username <username>
        And I type a password <password>
        And I click on the login button
        Then I should be presented with an alert box which contains text '<expectedAlertText>'

        Examples:
            | username  | password     | expectedAlertText    |
            | webdriver | webdriver123 | validation succeeded |
            | webdriver | Password123  | validation failed    |