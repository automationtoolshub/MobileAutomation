Feature: Login feature in netflixHome app in Android

    @android
    Scenario Outline: Netflix Logiin with <emailAddress>
        Given Load the Application for android
        Then Click Sign in Option for android
        Then Enter "<emailAddress>" in the email or phonumber text box for android
        Then Negative Condition for android

        Examples:
           |emailAddress|
           |test1@gmail.com|
           |test2@gmail.com|


    @androidRetry @android
    Scenario: Netflix negative Sceanrio
        Given Load the Application for android
        Then Click Sign in Option for android
        Then Negative Condition for android

    @androidGetStarted
    Scenario Outline: Netflix Logiin with <emailAddress>
        Given Load the Application for android
        Then Click Get Started button for android
        Then Enter user "<emailAddress>" in the text box for android

        Examples:
           |emailAddress|
           |test1@gmail.com|
           |test2@gmail.com|