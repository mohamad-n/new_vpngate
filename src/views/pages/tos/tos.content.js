import {theme} from '../../../theme';

export const tosContent = isDarkMode => {
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
<div class="policy_page">
<div id="policy_sec1"><h2></h2><p class="just_text">The hereby Standard Terms and Conditions written below fully and effectively shall manage your use of VPNGate services by any means. By using our services, you agreed to accept all terms and conditions written in here. You must not use this Website if you disagree with any of these Website Standard Terms and Conditions.</p></div><div id="policy_sec2"><h4>SECTION 1: ACCEPTANCE</h4><p class="just_text">We strongly advise our users to be informed that by accessing and using VPNGate, you completely accept and agree to be bound by the terms and provision of this agreement. In addition, when using our particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement and <span class="bold_text">IMPLIES A LEGALLY MUTUAL BINDING AGREEMENT BETWEEN YOU AS THE USER AND VPNGATE AS THE SERVICE PROVIDER.</span> If you do not agree to abide by the above, please do not use this service. By subscribing to avail our Services, you denote that you are eighteen (18) years old or above.</p></div><div id="policy_sec2"><h4>SECTION 2: VARIATION OF TERMS  </h4><p class="just_text">As for any other online platform service provider, VPNGate is entitled to update and modify the Terms without any notice. Your incessant usage of our services at any form is always subjected to the latest, upgraded and revised version of our service terms. Of course, the latest version is always available at <a href="/">https://vpngate.online/</a> and it is the user’s responsibility to be updated and aware of our latest Terms and Conditions. Your continuous use of the Content or Services following the changes to these terms automatically implies your acceptance of our updated terms. If necessary we may provide you with notices, including those regarding changes to the Terms, by email, regular mail, or postings on the Services.</p></div><div id="policy_sec2"><h4>SECTION 3: PRIVACY POLICY</h4><p class="just_text">The policies regarding how we protect the privacy of our users has been stated and elaborated in detail as a separated document <a href="/policy">here</a>. Please read our Privacy Policy to understand how we manage your sensitive data.</p></div><div id="policy_sec2"><h4>SECTION 4: SERVICE PROVISION AND AVAILING </h4><p class="just_text">Complete list of our subscription plans and the corresponding fees is available on our website. VPNGate reserves the right to alter subscription fees or apply new fees which will be notified in our website. Subscriber’s current subscription will not be subjected to any price change and shall only be effective upon generating a new subscription plan. In these Website Standard Terms and Conditions, &quot;Your Content&quot; shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant VPNGate a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media. Keeping the sensitivity of online personal private data into the consideration, VPNGate principal obligation is to protect each individual’s privacy.  Users are encouraged to not sharing sensitive personal data via online platforms to protect their privacy. VPNGate via standard algorithms directs the users through encrypted upload and download pathways to avert and minimize all the possible cyber-attacks by intra-network malwares. However, we recommend to not share as such data via online platforms.<br/><br/>Your Content must be your own and must not be invading any third-party’s rights. VPNGate reserves the right to remove any of your content from this Website at any time without notice.</p></div><div id="policy_sec2"><h4>SECTION 5: RATIONAL USAGE AND RESTRICTIONS</h4><p class="just_text">VPN Gate services have been allotted worldwide, in a way that users are capable of location selection and connection according to their needs. The speed and quality of server connection is set at the highest possible level, whereas new servers can be added if necessary. It is expected from our users to fully realize the importance of keeping their VPNGate account information confidential. The responsibility of all the actions belong solely to the users. If you ever discover or suspect that someone has accessed your account without your authorization, you are advised to inform us immediately so that we may revoke your account credentials and issue new ones. VPNGate requires all users to avoid any type of misuse and misconduct of or via our Services or platforms. For you to understand, a misuse is defined as any usage, access, or interference with the Content or Services contrary to the Terms or applicable laws and regulations. Each user who utilizes the provided platform by VPNGate in actions designated as below as restrictions would be terminated to access us, and all services will be revoked by VPNGate unilaterally.</p><h4>Restrictions </h4><ul><li>Send or transmit unsolicited advertisements or content (i.e., “spam&quot;) over the Service.</li><li>Send, post, or transmit over the Service any content which is illegal, hateful, threatening, insulting, or defamatory; infringes on intellectual property rights; invades privacy; or incites violence.</li><li>Upload, download, post, reproduce, or distribute any content protected by copyright or any other proprietary right without first having obtained permission from the owner of the proprietary content.</li><li>Upload, download, post, reproduce, or distribute any content that includes sexual or explicit depictions of minors.</li><li>Engage in any conduct that restricts or inhibits any other Subscriber from using or enjoying the Service.</li><li>Attempt to access, probe, or connect to computing devices without proper authorization (i.e., any form of “hacking”).</li><li>Attempt to compile, utilize, or distribute a list of IP addresses operated by VPNGate in conjunction with the Service.</li><li>Use the Service for anything other than lawful purposes.</li></ul></div><div id="policy_sec2"><h4>SECTION 6: INTELLECTUAL PROPERTY RIGHTS</h4><p class="just_text">Other than the content you own, under these Terms, VPNGate and/or its licensors own all the intellectual property rights and materials contained in our Website and application. You are granted a limited and a non-exclusive license only for purposes of downloading and using our software strictly and exclusively in accordance with our Terms and not in any other way.</p></div><div id="policy_sec2"><h4>SECTION 7: LINGUISTIC ISSUES </h4><p class="just_text">All of our Content is always provided only in English. VPNGate  does not guarantee and ensure the accuracy of translated Contents. In the event of any inconsistency or conflict between the translated and original, the English Content shall preponderate.</p></div><div id="policy_sec2"><h4>SECTION 8: THIRD-PARTY ENTITIES</h4><p class="just_text">In any case that we necessarily provide you a service which belongs or leads to a third-party link or entity, VPNGate does not have any responsibility regarding the contents or any incidents regarding that specific third-party. Aforementioned  third-parties are obliged to follow only their own designated service terms which consequently compel all users to review and understand their terms before availing and utilizing any of their services.  </p></div><div id="policy_sec2"><h4>SECTION 9: DISCLAIMERS</h4><p class="just_text">This Website is provided on an &quot;as-is&quot; and “as-available” basis with all faults, and VPNGate express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you. VPNGate will always try  best to provide the Service available at all times. However, the Service may be subject to unavailability for a variety of factors beyond our control, including but not limited to emergencies; third-party-service failures; or transmission, equipment, or network problems or limitations, interference, or signal strength; and may be interrupted, refused, limited, or curtailed. We are not responsible for data, messages, or pages lost, not delivered, delayed, or misdirected because of interruptions or performance issues with the Service, communications services, or networks. We may impose usage or Service limits, suspend Service, terminate VPN accounts, or block certain kinds of usage in our sole discretion to protect Subscribers or the Service. The accuracy and timeliness of data received is not guaranteed; delays or omissions may occur.</p></div><div id="policy_sec2"><h4>SECTION 10: LIMITATION OF LIABILITY</h4><p class="just_text">In no event shall VPNGate, nor any of its officers, subsidiaries, directors and employees be held liable for anything arising out of or in any way connected with your use of this Website and its services whether such liability is under contract.  VPNGate, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of  our Website, Services, and Platforms.</p></div><div id="policy_sec2"><h4>SECTION 11: INDEMNIFICATION</h4><p class="just_text">You hereby indemnify to the fullest extent VPNGate its officers, directors, employees, members, partners, agents, and suppliers, and their respective affiliates, officers, directors, employees, members, shareholders, partners, and agents from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these Terms.</p></div><div id="policy_sec2"><h4>SECTION 12: SEVERABILITY</h4><p class="just_text">If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.</p></div><div id="policy_sec2"><h4>SECTION 13: ASSIGNMENT</h4><p class="just_text">The VPNGate is allowed to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.</p></div><div id="policy_sec2"><h4>SECTION 14: ENTIRE AGREEMENT</h4><p class="just_text">These Terms constitute the entire agreement between VPNGate and you in relation to your use of this Website and provided services, and supersede all prior agreements and understandings.</p></div><div id="policy_sec2"><h4>SECTION 15: GOVERNING LAW AND JURISDICTION</h4><p class="just_text">These Terms will be governed by and interpreted in accordance with the laws of Georgia, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Georgia for the resolution of any disputes.</p></div></div>
  </body>
</html>
        `;
};
