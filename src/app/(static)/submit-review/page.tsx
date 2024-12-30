import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit Review",
};

export default function SubmitReviewPage() {
  return (
    <>
      <h1>Submit New Protocol Reviews</h1>
      <h2>Who Can Submit Reviews?</h2>
      <p>
        DeFiScan is an open-source project and everyone can create and submit
        new protocol reviews. We further run initiatives to involve the
        community more closely in this process and increase coverage of the DeFi
        sector. Follow us on <a href="https://x.com/defiscan_info">X</a> or join
        our <a href="https://discord.gg/Z467Ehv6VU">Discord</a> to stay
        up-to-date on any such initiatives.
      </p>
      <h2>Getting Started</h2>
      <p>Follow the steps below to create and submit a new protocol review:</p>
      <ol>
        <li>
          Fork the DeFiScan GitHub{" "}
          <a href="https://github.com/deficollective/defiscan">repository</a>.
        </li>
        <li>
          Copy the protocol review{" "}
          <a href="https://github.com/deficollective/defiscan/blob/main/src/content/template.md?plain=1">
            template
          </a>{" "}
          to a new file named after the protocol
        </li>
        <li>
          Clone and install the Permission Scanner from the GitHub{" "}
          <a href="https://github.com/deficollective/permission-scanner">
            repository
          </a>
          .
        </li>
        <li>
          Create a report of all permissioned functions found in the protocol
          using the Permission Scanner
        </li>
        <li>
          Complete the protocol review following the methodology outlined{" "}
          <a href="https://deficollective.org/blog/introducing-defiscan">
            here
          </a>{" "}
        </li>
        <li>
          Submit a PR on the main{" "}
          <a href="https://github.com/deficollective/defiscan">repository</a>{" "}
          with the name of the protocol review
        </li>
        <li>
          Ping the team in our{" "}
          <a href="https://discord.gg/Z467Ehv6VU">Discord</a> to get the PR
          reviewed and merged
        </li>
      </ol>
      <p className="mt-10">
        <strong>Note</strong>, by submitting a PR with a protocol review, you
        agree that the DeFi Collective may freely use the submitted content.
        Please see our <a href="/terms">Terms</a>.
      </p>
    </>
  );
}
