import {theme} from '../../../theme';

export const privacyContent = isDarkMode => {
  return `
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
    body {
        background-color : ${
          isDarkMode ? theme.dark.mainBackground : theme.light.mainBackground
        };
        font-family: Arial, Helvetica, sans-serif;
        margin: auto;
        max-width: 700px;
        
    }
    p {
        // font-size: 1rem;
        // line-height:10px;
        color:${isDarkMode ? theme.dark.subTitle : theme.light.subTitle}

    }
    
    li {
        // font-size: 3rem;
        margin-bottom:30px;
        color:${isDarkMode ? theme.dark.subTitle : theme.light.subTitle}

    }
    
    ul {
        line-height:1.7rem;
    //    text-align: justify; 
    color:${isDarkMode ? theme.dark.subTitle : theme.light.subTitle}
    
    }
    
    h4{
        font-size:1.2rem;
        color:${isDarkMode ? theme.dark.title : theme.light.title}
    }
    .policy_page {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color : ${
          isDarkMode ? theme.dark.mainBackground : theme.light.mainBackground
        }
    }
    
    div#policy_sec1 {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 40px;
    }
    
    .just_text {
        line-height:1.7rem;
        text-align: justify;
    }
    
    .bold_text {
        /* font-style: italic; */
        font-weight: bold;
    }
    
    div#policy_sec3 {
        margin: 0px 0px;
    }
    
    h4.title_desc_policy {
        margin-bottom: 10px;
    }
    
    @media (max-width: 576px) {
        .policy_page {
            margin: 0px 20px;
        }
    }
    
    @media (min-width: 577px) and (max-width: 1000px) {
        .policy_page {
            margin: 0px 50px;
        }
    }
    
    </style>
  </head>
  <body>
<div class="policy_page"><div id="policy_sec1"><h2></h2><p class="just_text">As demanded, VPNGate is completely devoted to protect privacy of the users. Described below is the information we collect and how they are used by us. Additionally, we declare that we do not collect nor store any activity logs in any kind (either browsing and data content or DNS queries). Please read this page to understand how the minimum possible data is collected solely to improve our services and technical performance. Gathering such information is exclusively for providing aptitudes such as personalization services, interactive communications, online shopping, and personalized communication. We also use the information to estimate the size of our audience and measure certain traffic patterns to track the progress and number of entries in our promotions and contests, to track visits to and business conducted at our online store, and also to notify our visitors about updates to our website and system statuses.</p></div><div id="policy_sec2"><h4>Collected data</h4><ul><li><p class="just_text"><span class="bold_text">Personal information : </span>To provide and dispense our services we require your name, email address, and payment information to create your subscription. Payment information is used for processing service orders, renewals, cancelations, fraud checking. Note that we do not store credit card details and we do not process payments directly. All payments will be carried out via third party payment platforms.<!-- --> </p></li><li><p class="just_text"><span class="bold_text">Diagnostic and connection summary : </span>Include anonymous reports based on minimum required data about application performance, Speed test data, connection diagnostics, and crash experiences. We retain last 20 connection records (time, duration, country, unit model, and the running version of application) for a certain limited time and temporarily just to recognize possible concerns regarding the connectivity and provide satisfactory support.<span class="bold_text"> VPNGate does not maintain user’s physical location or IP addresses.</span>Furthermore, once the App is activated, users would be asked if they prefer to share these data with us. Users are able to activate or deactivate diagnostic data sharing at any time in the App’s settings menu. For iOS users ,<a href="https://support.apple.com/en-us/HT202100" target="_blank">Apple’s crash reporting can be turned off in iOS settings.<!-- --> </a></p></li><li><p class="just_text"><span class="bold_text">Active sessions information : </span>To check the total of connected devices at the same time from single account.</p></li><li><p class="just_text"><span class="bold_text">Correspondence information : </span>We preserve all the conversations that occur between our customer service and users depending on how we communicate.</p></li><li><p class="just_text"><span class="bold_text">Webpage information : </span>Include the browsed pages, IP addresses and activities while browsing on VPNGate website by users. The collection of this information is handled by third party services such as Google Analytics. Of course, to respect user privacy, passwords or any billing information such as address, phone number, card number or any other sensitive information are excluded from being saved. If we receive a DNT header from user browsers, no tracking javascript snippets and no 3rd party analytic tools will be used anywhere on our website.</p></li></ul></div><div id="policy_sec2"><h4>Cookies</h4><ul><li class="just_text">We Use cookies for optimization and improvements of the user experience by helping us deliver certain functionalities, such as website login and language settings. The cookies we use may vary over time as we continuously update and improve our Site.</li><li class="just_text">At any time, users can freely modify their cookie preferences. You can do this in the settings panel for your browser. Our utilized cookies help us to set language preferences, and can safely show all specific information about users account after logging in. </li><li class="just_text">The cookies contain a user identifier, but no directly personally identifying information such as your name or email address, and do not track any activity outside of our domains.</li><li class="just_text">We might set various cookie at different times during user browsing in our Website. Cookies are continuously being updated as long as users request to access pages in our Website.</li></ul></div><div><div id="policy_sec3"><h4 class="title_desc_policy">Data sharing declaration </h4><p class="just_text">VPNGate does not sell, rent, or trade user personal information with anybody or any third-party entity.</p></div><div id="policy_sec3"><h4 class="title_desc_policy">Consent and Age Restrictions</h4><p class="just_text">Utilizing the services provided by VPNGate implies that you have consented to partake your information handled as described in our Terms of Service and Privacy Policy. The Services are restricted and permitted only for individuals aged above 18 and above </p></div><div id="policy_sec3"><h4 class="title_desc_policy">Privacy Policy updating</h4><p class="just_text">Our Privacy Policy might be updated occasionally based on applicable privacy laws and regulations. Users will always be informed of the latest updated concise version of our policies regarding privacy protection.  </p></div></div></div>
  </body>
</html>
        `;
};
