import React, { useState, useEffect } from 'react';
import ProgressGuide from './progressguide';
import GuideCard from './guidecard';
import { TranslatedText, TranslateWidget } from './translate';

const Guide = () => {
  const defaultCards = [
    {
      title: 'Getting a BSN',
      status: 'In Progress', 
      previewText: 'A BSN is required for many official processes. \n This must be completed before you do the other steps. \n This guide will make the process quick and easy.\n',
      description: 'You will automatically receive a citizen service number (BSN) when you register in the Municipal Personal Records Database (BRP).',
      description2: 'In some cases, it is possible to be registered with priority via an urgent process. This applies to: status holders with an employment contract, status holders who are offered a home and status holders and non-status holders who need a BSN for medical reasons.',
      description3: 'Status holders register directly in the BRP via a BRP street. Asylum seekers who do not yet have a residence permit must wait 6 months. Under normal circumstances, this waiting period is waived if the identity of the asylum seeker has been established, if the asylum seeker is legally residing in the Netherlands or if the asylum seeker is expected to stay in the Netherlands for more than 4 months.',
      description4: 'The following asylum seekers cannot register in the BRP: Dublin claimants (people that want to go to a different country) - asylum seekers who come from a safe country of origin - foreigners who are already entitled to protection in another EU Member State - asylum seekers whose identity has not been established.',
      description5: 'To apply for a BSN, you need to visit the local municipality where you will be living. You will need to bring valid identification and proof of your residence in the Netherlands.',
      description6: 'Once you have your BSN, you can use it for various official processes, such as opening a bank account, applying for a residence permit, and more.',
      description7: 'When you are done with this step, please mark it as done in the top right and move on to the next step.'
    },
    {
      title: 'Getting a Bank Account',
      status: 'In Progress',
      previewText: 'A bank account is essential to have, because you have to have one to receive your salary.',
      description: 'A Dutch bank account is essential for receiving salary, paying bills, and managing daily expenses in the Netherlands.',
      description2: 'You can open a bank account at most banks in the Netherlands, such as ABN AMRO, ING, Rabobank, and others.',
      description3: 'To open a bank account you will have to visit a bank in person or go to their website to start the process online. Which bank you choose may depend on your personal preferences, such as fees, services, and convenience. Further information can be found on the bank\'s website.',
      description4: 'To open a bank account, you will typically need to provide your BSN, proof of identity (such as a passport or residence permit), and proof of address (such as a rental contract or utility bill).',
      description5: 'Some banks may also require additional documentation, such as proof of employment or income.',
      description6: 'Once you have opened a bank account, you will receive a debit card and online banking access, which will allow you to manage your finances conveniently.',
      description7: 'When you are done with this step, please mark it as done in the top right and move on to the next step.',
      condition: 'Must have a BSN',
    },
    {
      title: "Becoming a Statusholder",
      status: 'In Progress',
      previewText: 'Get your residence permit',
      description: 'A residence permit that gives you the right to live and work in the Netherlands. This process includes various steps with the IND (Immigration and Naturalisation Service).',
      description2: 'The IND is the Dutch government agency responsible for processing applications for residence permits, visas, and citizenship.',
      description3: 'You will need to apply for a residence permit through the IND, which can be done online or in person at an IND office.',
      description4: 'The application process may require you to provide various documents, such as proof of identity, proof of employment or study, and proof of sufficient income.',
      description5: 'Once your application is approved, you will receive a residence permit card, which serves as proof of your legal status in the Netherlands.',
      description6: 'It is important to keep your residence permit up to date and renew it before it expires to maintain your legal status in the country.',
      description7: 'If you have any questions or need assistance with the application process, you can contact the IND or seek help from local support organizations.',
      description8: 'Visit the IND website to make a new appointment to get your permits.',
      description9: 'When you are done with this step, please mark it as done in the top right.',
    },
  ];

  const [cards, setCards] = useState(() => {
    try {
      const storedStatuses = localStorage.getItem('guide-cards-status');
      if (storedStatuses) {
        const statuses = JSON.parse(storedStatuses);
        return defaultCards.map((card, index) => ({
          ...card,
          status: statuses[index] || card.status
        }));
      }
      return defaultCards;
    } catch (e) {
      console.error('Failed to load from localStorage:', e);
      return defaultCards;
    }
  });

  useEffect(() => {
    try {
      const statuses = cards.map(card => card.status);
      localStorage.setItem('guide-cards-status', JSON.stringify(statuses));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [cards]);

  const toggleStatus = (index) => {
    setCards((prevCards) =>
      prevCards.map((card, i) =>
        i === index
          ? {
              ...card,
              status: card.status === 'Done' ? 'In Progress' : 'Done',
            }
          : card
      )
    );
  };

  const doneCount = cards.filter((card) => card.status === 'Done').length;
  const progress = Math.round((doneCount / cards.length) * 100);

  return (
    <>
      <TranslateWidget />
      <div style={styles.page}>
        <h2 style={styles.header}>
          <TranslatedText text="Integration Guide" />
        </h2>
        <p style={styles.progressText}>
          <TranslatedText text="Progress" />: {progress}%
        </p>
        <ProgressGuide progress={progress} />
        {cards.map((card, i) => (
          <GuideCard
            key={i}
            {...card}
            index={i}
            toggleStatus={toggleStatus}
          />
        ))}
      </div>
    </>
  );
};

const styles = {
  page: {
    padding: '1rem',
    paddingBottom: '80px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '500px',
    margin: 'auto',
  },
  header: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
  },
  progressText: {
    fontSize: '0.9rem',
    marginBottom: '0.25rem',
  },
};

export default Guide;