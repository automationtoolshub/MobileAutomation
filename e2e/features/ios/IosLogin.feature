Feature: Login feature in netflixHome app in iOS

    @smoke @iosPlusHomSSOLogin
    Scenario Outline: Scenario Outline: Verify User can complete the Agreement Screen for iOS
        #Given Complete the Login, secret, Agreement and Animation page based on "<routerType>" for iOS
        Given Load the netflixHome Application for iOS
        Then  Verify Sign in page is displayed for iOS
        And Enter the credentials based on "<routerType>" for iOS
        And Tab the Sign In Button for iOS
        Then Enter the secret Question based on "<routerType>" and Complete Secret Question page if it is displayed for iOS
        Then Click Accept Term button in the Agreement Page for iOS if it is displayed
        Then Verify User landed to netflixHome home page for iOS

        Examples:
            | routerType |
            | CHR2FB     |


    # @smoke @iosPlusHomSSOLogin @iosKillingApp
    # Scenario Outline: netflixHome Login using "<userId>",Iteration "<iteration>" in iOS Device by killing App for every Iteration
    #     Given Load the netflixHome Application for iOS
    #     Then  Verify Sign in page is displayed for iOS
    #     And Enter the credentials based on "<routerType>" for iOS
    #     Then Tab the Sign In Button and Verify User landed to netflixHome home page for iOS by killing App

    #     Examples:
    #         | userId                 | password  | secrectAnswer | iteration |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | 1         |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | 2         |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | 3         |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | 4         |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | 5         |

    # @smoke @iosPlusHomSSOLogin @iosWithOutKillingApp
    # Scenario Outline: netflixHome Login using "<userId>", Iteration "<iteration>" in iOS Device by without killing App for every Iteration
    #     Given Load the netflixHome Application for iOS
    #     Then  Verify Sign in page is displayed for iOS
    #     And Enter the credentials based on "<routerType>" for iOS
    #     Then Tab the Sign In Button and Verify User landed to netflixHome home page for iOS by withoutKilling App

    #     Examples:
    #         | userId                 | password  | secrectAnswer | iteration |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | 1         |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | 2         |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | 3         |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | 4         |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | 5         |

    # @smoke @iosSOMultiAccount
    # Scenario Outline: netflixHome Login using "<userId>", AccountType "<routerType>","<iteration>" in iOS
    #     Given Load the netflixHome Application for iOS
    #     Then  Verify Sign in page is displayed for iOS
    #     And Enter the credentials based on "<routerType>" for iOS
    #     And Tab the Sign In Button for iOS
    #     Then Enter the secret Question based on "<routerType>" and Complete Secret Question page if it is displayed for iOS
    #     Then Click Accept Term button in the Agreement Page for iOS if it is displayed
    #     Then Verify User landed to netflixHome home page for iOS

    #     Examples:
    #         | userId                 | password  | secrectAnswer | routerType | iteration |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 1         |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 2         |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 3         |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 4         |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 5         |
    #         | homeqatest05@gmail.com | Home9477& | netflix       | CHR2FB      | 1         |
    #         | homeqatest05@gmail.com | Home9477& | netflix       | CHR2FB      | 2         |
    #         | homeqatest05@gmail.com | Home9477& | netflix       | CHR2FB      | 3         |
    #         | homeqatest05@gmail.com | Home9477& | netflix       | CHR2FB      | 4         |
    #         | homeqatest05@gmail.com | Home9477& | netflix       | CHR2FB      | 5         |
    #         | w01w60a11              | Home3951@ | netflix       | BHRX        | 1         |
    #         | w01w60a11              | Home3951@ | netflix       | BHRX        | 2         |
    #         | w01w60a11              | Home3951@ | netflix       | BHRX        | 3         |
    #         | w01w60a11              | Home3951@ | netflix       | BHRX        | 4         |
    #         | w01w60a11              | Home3951@ | netflix       | BHRX        | 5         |
    #         | vze2etitan652          | Logmein1! | netflix       | TITAN2      | 1         |
    #         | vze2etitan652          | Logmein1! | netflix       | TITAN2      | 2         |
    #         | vze2etitan652          | Logmein1! | netflix       | TITAN2      | 3         |
    #         | vze2etitan652          | Logmein1! | netflix       | TITAN2      | 4         |
    #         | vze2etitan652          | Logmein1! | netflix       | TITAN2      | 5         |
    #         | vze2etitan646          | Logmein1! | netflix       | TITAN3      | 1         |
    #         | vze2etitan646          | Logmein1! | netflix       | TITAN3      | 2         |
    #         | vze2etitan646          | Logmein1! | netflix       | TITAN3      | 3         |
    #         | vze2etitan646          | Logmein1! | netflix       | TITAN3      | 4         |
    #         | vze2etitan646          | Logmein1! | netflix       | TITAN3      | 5         |
    #         | vze2etitan113          | Logmein3! | netflix       | TITAN1.5    | 1         |
    #         | vze2etitan113          | Logmein3! | netflix       | TITAN1.5    | 2         |
    #         | vze2etitan113          | Logmein3! | netflix       | TITAN1.5    | 3         |
    #         | vze2etitan113          | Logmein3! | netflix       | TITAN1.5    | 4         |
    #         | vze2etitan113          | Logmein3! | netflix       | TITAN1.5    | 5         |

    # @smoke @iosSOMultiAccountChrf2a
    # Scenario Outline: netflixHome Login using "<userId>", AccountType "<routerType>","<iteration>" in iOS
    #     Given Load the netflixHome Application for iOS
    #     Then  Verify Sign in page is displayed for iOS
    #     And Enter the credentials based on "<routerType>" for iOS
    #     And Tab the Sign In Button for iOS
    #     Then Enter the secret Question based on "<routerType>" and Complete Secret Question page if it is displayed for iOS
    #     Then Click Accept Term button in the Agreement Page for iOS if it is displayed
    #     Then Verify User landed to netflixHome home page for iOS

    #     Examples:
    #         | userId                 | password  | secrectAnswer | routerType | iteration |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 1         |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 2         |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 3         |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 4         |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 5         |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 6         |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 7         |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 8         |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 9         |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 10        |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 11        |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 12        |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 13        |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 14        |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 15        |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 16        |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 17        |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 18        |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 19        |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 20        |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 21        |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 22        |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 23        |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 24        |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 25        |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 26        |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 27        |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 28        |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 29        |
    #         | homeqatest01@gmail.com | Home7455% | netflix       | CHR2FB      | 30        |

    @smoke @iosPlusHomSSOLoginStatus
    Scenario Outline: <accountType> - <routerType> - <userId>
        Given Load the netflixHome Application for iOS
        Then  Verify Sign in page is displayed for iOS
        And Enter the credentials based on "<routerType>" for iOS
        And Tab the Sign In Button for iOS
        Then Enter the secret Question based on "<routerType>" and Complete Secret Question page if it is displayed for iOS
        Then Click Accept Term button in the Agreement Page for iOS if it is displayed
        Then Verify User landed to netflixHome home page for iOS and track Status based on "<userId>" and "<routerType>"

        Examples:
            | accountType | routerType | userId                 |
            | FIOS        | CHR2FB     | homeqatest01@gmail.com |
            | FIOS        | CHR2FA1    | RM21W120B              |
            | FIOS        | CHR2FB     | homeqatest05@gmail.com |
            | FIOS        | BHRX       | w01w60a11              |
            | FIOS        | BHR4       | W02L158B04             |
            | FWA         | TITAN1.5   | vze2etitan113          |
            | FWA         | TITAN2     | w01l233t663            |
            | FWA         | TITAN3     | w60a11t646             |

