import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const CollapseSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <button
        className="w-full flex justify-between items-center px-4 py-2 font-medium text-left bg-gray-100 hover:bg-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {isOpen && (
        <div className="p-4 text-sm text-gray-700 bg-white">{children}</div>
      )}
    </div>
  );
};

const AboutRewardify = () => {
  return (
    <div className="space-y-4 text-sm pb-24">
      <div>
        <h2 className="text-lg font-semibold">About REWARDIFY</h2>
        <p className="text-gray-500">
          Here you can view our T&C, Privacy Policy etc.
        </p>
      </div>

      <CollapseSection title="About US">
        Lorem ipsum dolor sit amet consectetur. Nulla duis ornare arcu enim.
        Placerat donec ipsum in vitae ante at orci. Lorem ipsum semper aliquam
        mauris ut eu id pellentesque libero. Ut massa ut amet et arcu non
        bibendum velit odio. Sed eu facilisi facilisis a suspendisse. Eu in amet
        gravida placerat sed volutpat. Massa elementum risus elit bibendum a
        amet hac. Integer nunc dignissim ultrices quam venenatis. At etiam sem
        accumsan et elit. Velit mus felis quam donec faucibus nec nibh auctor
        dictum. Enim consequat a quisque facilisis. Scelerisque turpis risus
        purus nisl ultricies faucibus odio tempus. Pellentesque amet enim enim
        volutpat vulputate. Nibh egestas in facilisi est volutpat magna porta.
        Semper facilisis nunc tortor scelerisque. Sem augue purus augue est
        tempor. Nunc tortor faucibus ullamcorper purus aliquam lectus. Mi
        integer a vulputate diam commodo cursus arcu. Lectus dignissim senectus
        sem mollis augue. arcu. Lectus dignissim senectus sem mollis augue.
        arcu. Lectus dignissim senectus sem mollis augue. rcu. Lectus dignissim
        senectus sem mollis augue. vulputate. Nibh egestas in vulputate. Nibh
        egestas in vulputate. Nibh egestas in vulputate. Nibh egestas in .
      </CollapseSection>

      <CollapseSection title="Terms & Condition">
        Terms and conditions content goes here...
      </CollapseSection>

      <CollapseSection title="Privacy Policy">
        Privacy policy content goes here...
      </CollapseSection>
    </div>
  );
};

export default AboutRewardify;
