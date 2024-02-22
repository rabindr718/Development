import RectangleComponent from "./RectangleComponent";
import styles from "./FrameComponent.module.css";

const FrameComponent = () => {
  return (
    <footer className={styles.componentParent}>
      <RectangleComponent />
      <div className={styles.buildingabusinessParent}>
        <div className={styles.buildingabusiness}>
          <img
            className={styles.buildingabusinessChild}
            loading="eager"
            alt=""
            src="/group-121.svg"
          />
          <div className={styles.buildingABusinessContainer}>
            <p className={styles.buildingABusiness}>
              Building a business can be challenging,
            </p>
            <p className={styles.ourNewsletterCan}>our newsletter can help.</p>
          </div>
        </div>
        <div className={styles.followuson}>
          <div className={styles.subscribeForm}>
            <b className={styles.weWontSpam}>We won't spam, promise! 🤝</b>
            <input
              className={styles.businessNewsletter}
              placeholder="Yor Email Address"
              type="text"
            />
          </div>
          <button className={styles.subscribeButton}>
            <div className={styles.subscribeButtonChild} />
            <div className={styles.subscribe}>Subscribe</div>
          </button>
        </div>
        <div className={styles.productCampaigns}>
          <b className={styles.followUsOn}>Follow us on</b>
          <div className={styles.resourcesSection}>
            <img className={styles.groupIcon} alt="" src="/group-76.svg" />
            <img className={styles.groupIcon1} alt="" src="/group-77.svg" />
            <img className={styles.groupIcon2} alt="" src="/group-78.svg" />
            <img className={styles.groupIcon3} alt="" src="/group-79.svg" />
          </div>
        </div>
      </div>
      <div className={styles.affiliateProgram}>
        <div className={styles.marketingTools}>
          <div className={styles.companyAboutUsContactUsPr}>
            <div className={styles.productLoyaltyCampaignsContainer}>
              <p className={styles.product}>
                <span className={styles.product1}>Product</span>
              </p>
              <p className={styles.blankLine}>
                <span className={styles.blankLine1}>&nbsp;</span>
              </p>
              <p className={styles.loyalty}>
                <span className={styles.loyalty1}>Loyalty</span>
              </p>
              <p className={styles.campaigns}>
                <span className={styles.campaigns1}>
                  <span className={styles.campaigns2}>Campaigns</span>
                </span>
              </p>
              <p className={styles.insights}>
                <span className={styles.insights1}>
                  <span className={styles.insights2}>Insights</span>
                </span>
              </p>
              <p className={styles.autoCampaigns}>
                <span className={styles.autoCampaigns1}>
                  <span className={styles.autoCampaigns2}>Auto Campaigns</span>
                </span>
              </p>
              <p className={styles.feedback}>
                <span className={styles.feedback1}>
                  <span className={styles.feedback2}>Feedback</span>
                </span>
              </p>
              <p className={styles.qrCode}>
                <span className={styles.qrCode1}>
                  <span className={styles.qrCode2}>QR Code</span>
                </span>
              </p>
              <p className={styles.loyaltyInspiration}>
                <span className={styles.loyaltyInspiration1}>
                  <span className={styles.loyaltyInspiration2}>
                    Loyalty Inspiration
                  </span>
                </span>
              </p>
              <p className={styles.onlineReviews}>
                <span className={styles.onlineReviews1}>
                  <span className={styles.onlineReviews2}>Online Reviews</span>
                </span>
              </p>
              <p className={styles.referral}>
                <span className={styles.referral1}>
                  <span className={styles.referral2}>Referral</span>
                </span>
              </p>
            </div>
          </div>
          <div className={styles.companyAboutUsContainer}>
            <p className={styles.company}>Company</p>
            <p className={styles.blankLine2}>&nbsp;</p>
            <p className={styles.aboutUs}>About Us</p>
            <p className={styles.contactUs}>Contact Us</p>
            <p className={styles.pricing}>Pricing</p>
            <p className={styles.careers}>Careers</p>
            <p className={styles.termsOfService}>Terms of Service</p>
            <p className={styles.privacyPolicy}>Privacy Policy</p>
            <p
              className={styles.refundCancellation}
            >{`Refund & Cancellation`}</p>
          </div>
          <div className={styles.pricingDetails}>
            <div className={styles.resourcesVideoAcademyContainer}>
              <p className={styles.resources}>
                <span className={styles.resources1}>Resources</span>
              </p>
              <p className={styles.blankLine3}>
                <span className={styles.blankLine4}>&nbsp;</span>
              </p>
              <p className={styles.videoAcademy}>
                <span className={styles.videoAcademy1}>
                  <span className={styles.videoAcademy2}>Video Academy</span>
                </span>
              </p>
              <p className={styles.blog}>
                <span className={styles.blog1}>
                  <span className={styles.blog2}>Blog</span>
                </span>
              </p>
              <p className={styles.caseStudies}>
                <span className={styles.caseStudies1}>
                  <span className={styles.caseStudies2}>Case Studies</span>
                </span>
              </p>
              <p className={styles.growthStories}>
                <span className={styles.growthStories1}>
                  <span className={styles.growthStories2}>Growth Stories</span>
                </span>
              </p>
              <p className={styles.successStories}>
                <span className={styles.successStories1}>
                  <span className={styles.successStories2}>
                    Success Stories
                  </span>
                </span>
              </p>
              <p className={styles.webinars}>
                <span className={styles.webinars1}>
                  <span className={styles.webinars2}>Webinars</span>
                </span>
              </p>
              <p className={styles.helpCenter}>
                <span className={styles.helpCenter1}>
                  <span className={styles.helpCenter2}>Help Center</span>
                </span>
              </p>
              <p className={styles.watchDemo}>
                <span className={styles.watchDemo1}>
                  <span className={styles.watchDemo2}>Watch demo</span>
                </span>
              </p>
            </div>
            <div className={styles.videosAcademy}>
              <div className={styles.posIntegrationApiContainer}>
                <p className={styles.posIntegrationApi}>POS Integration API</p>
                <p className={styles.affiliateProgram1}>Affiliate Program</p>
                <p className={styles.marketingCalendar}>Marketing Calendar</p>
                <p className={styles.marketingPlaybook}>Marketing Playbook</p>
                <p className={styles.marketingTemplates}>Marketing Templates</p>
                <p className={styles.socialContentCalendar}>
                  Social Content Calendar
                </p>
                <p className={styles.repeatBusinessPlaybook}>
                  Repeat Business Playbook
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FrameComponent;
