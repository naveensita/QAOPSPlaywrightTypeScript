Feature: Ecommerce validations

    @Regression
    Scenario: Placing the order
        Given Login to ecommerce application with "naveenpathak715@gmail.com" and "Sonu123@#"
        When Add "ZARA COAT 3" to cart
        Then Verify "ZARA COAT 3" is displayed in the cart
        When Enter valid details and place the order
        Then Verify order is present in the order history

    @Validation
    Scenario Outline: Invalid Login Test
        Given Login to ecommerce2 application with "<username>" and "<password>"
        Then Verify error message is displayed
        Examples:
            | username      | password          |
            | rahulshetty   | Learning@830$3mK2 |
            | hello123@.com | Iamhello@12       |

