import React from "react";
import styles from "../../styles/components/ReviewReturnsSection.module.css";

export default function Police() {
  return (
    <div className={`padding-container ${styles.reviewReturnsSection}`}>
      <div className={styles.shippingReturns}>{`Shipping & Returns`}</div>
      <div className={styles.content}>
        <div className={styles.titleParagraph}>
          <div
            className={styles.title}
          >{`Online Order Return & Exchange Procedure`}</div>
          <div className={styles.paragraph}>
            <div className={styles.confirmationReasonForReturnParent}>
              <div className={styles.confirmationReasonForContainer}>
                <ol className={styles.confirmationReasonForReturn}>
                  <li>Confirmation Reason for Return</li>
                </ol>
              </div>
              <div className={styles.loremIpsumDolor}>
                Lorem ipsum dolor sit amet consectetur. Porta volutpat
                adipiscing ornare mi velit. Semper gravida id neque blandit. In
                malesuada curabitur curabitur consectetur habitasse dui.
                Venenatis dictumst sodales tincidunt ornare nunc sed.
              </div>
            </div>
            <div className={styles.confirmationReasonForReturnParent}>
              <div className={styles.teamContactYou}>2. Team Contact You</div>
              <div className={styles.loremIpsumDolor1}>
                Lorem ipsum dolor sit amet consectetur. Porta volutpat
                adipiscing ornare mi velit. Semper gravida id neque blandit. In
                malesuada curabitur curabitur consectetur habitasse dui.
                Venenatis dictumst sodales tincidunt ornare nunc sed.
              </div>
            </div>
            <div className={styles.confirmationReasonForReturnParent}>
              <div className={styles.teamContactYou}>
                3. Attach Return Label
              </div>
              <div className={styles.loremIpsumDolor1}>
                Lorem ipsum dolor sit amet consectetur. Porta volutpat
                adipiscing ornare mi velit. Semper gravida id neque blandit. In
                malesuada curabitur curabitur consectetur habitasse dui.
                Venenatis dictumst sodales tincidunt ornare nunc sed.
              </div>
            </div>
            <div className={styles.confirmationReasonForReturnParent}>
              <div className={styles.teamContactYou}>4. Team Contact You</div>
              <div className={styles.loremIpsumDolor1}>
                Lorem ipsum dolor sit amet consectetur. Porta volutpat
                adipiscing ornare mi velit. Semper gravida id neque blandit. In
                malesuada curabitur curabitur consectetur habitasse dui.
                Venenatis dictumst sodales tincidunt ornare nunc sed.
              </div>
            </div>
          </div>
        </div>
        <div className={styles.titleParagraph}>
          <div className={styles.title}>Shipping</div>
          <div className={styles.confirmationReasonForContainer}>
            Lorem ipsum dolor sit amet consectetur. Porta volutpat adipiscing
            ornare mi velit. Semper gravida id neque blandit. In malesuada
            curabitur curabitur consectetur habitasse dui. Venenatis dictumst
            sodales tincidunt ornare nunc sed.
          </div>
          <div className={styles.confirmationReasonForContainer}>
            <p className={styles.utEtiamPretium}>
              Lorem ipsum dolor sit amet consectetur. Dui ultrices nec lorem
              posuere lectus elit sit dui amet. Tellus tempor facilisi nibh
              purus quis elit blandit elementum. Elit vulputate arcu vitae vitae
              est urna amet ullamcorper id. Mattis dignissim at auctor vitae
              nulla ac sodales morbi. Purus dui nunc dui vestibulum id.
            </p>
            <p className={styles.utEtiamPretium}>
              Ut etiam pretium sed eu nunc suspendisse pellentesque massa
              maecenas. Sagittis arcu purus sollicitudin senectus accumsan
              porttitor mollis sodales. Massa ultrices sed elit viverra vitae
              placerat feugiat libero. Ac quis adipiscing tincidunt malesuada.
              Nullam eu velit amet adipiscing aliquet. Elementum sed ut ut
              mauris nascetur. In non ut pulvinar eget diam cursus. Eu dui
              consectetur amet dapibus pellentesque praesent. Amet eu fringilla
              vitae.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
