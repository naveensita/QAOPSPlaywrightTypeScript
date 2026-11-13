Feature: Login Error validations

    @Validation
    Scenario Outline: Invalid Login Test
        Given Login to ecommerce2 application with "<username>" and "<password>"
        Then Verify error message is displayed
        Examples:
            | username      | password          |
            | rahulshetty   | Learning@830$3mK2 |
            | hello123@.com | Iamhello@12       |

