Feature: WebdriverUniversity.com

        Background: Pre condition
                Given I navigate to WebdriverUniversity homepage
                When I Click on the contact us button
                And I switch to new browser tab

        # Scenario: Valid Contact Us Form Submission
        #         And I type a first name
        #         And I type a last name
        #         And I enter an email address
        #         And I Type a comment
        #         And I click on the submit button
        #         Then I should be presented with a succesful contact us submission message

        # Scenario: Invalid Contact Us form Submission
        #         And I type a first name
        #         And I type a last name
        #         And I Type a comment
        #         Then I should be presented with a unsuccesful contact us message

        # Scenario: Valid Contact Us Form Submission - Using specific Data
        #         And I type a specific first name "Sarah"
        #         And I type a Specific last name "Woods"
        #         And I enter a specific email address "sarah_woods@example.com"
        #         And I Type a specific text "Hello World" and a number 2 within the comment input field
        #         And I click on the submit button
        #         Then I should be presented with a succesful contact us submission message


        # Scenario: Valid Contact Us Form Submission - Using Random Data
        #         And I type a random first name
        #         And I type a random last name
        #         And I enter a random email address
        #         And I Type a comment
        #         And I click on the submit button
        #         Then I should be presented with a succesful contact us submission message

        Scenario Outline: Validate Contact Us Page
                And I type a first name <firstName> and a last name <lastName>
                And I type a email address '<emailAddress>' and a '<comment>'
                And I click on the submit button
                Then I should be presented with a header text '<message>'

                Examples:
                        | firstName | lastName | emailAddress               | comment                   | message                     |
                        | John      | Jones    | john_jones@example.com     | Hello world               | Thank You for your Message! |
                        | Mia       | Kahlifa  | mia_kahlifa123@example.com | Tester 21234              | Thank You for your Message! |
                        | Lexi      | Lore     | lexi_lore                  | Do you do the best thing? | Invalid email address       |
