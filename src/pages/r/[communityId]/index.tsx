import { Community } from '@/src/atoms/communitiesAtom';
import Header from '@/src/components/Community/Header';
import NotFound from '@/src/components/Community/NotFound';
import PageContent from '@/src/components/Layout/PageContent';
import { firestore } from '@/src/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import React from 'react';
import safeJsonStringify from 'safe-json-stringify'

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage:React.FC<CommunityPageProps> = ({ communityData }) => {
  console.log('here is data', communityData)

  if (!communityData) {
    return <NotFound />
  }

  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <div>LHS</div>
          <div>LHS</div>
          <div>LHS</div>
        </>        
        <><div>RHS</div></>             
      </PageContent>
    </>
  )
}

export async function getServerSideProps(context: GetServerSideProps) {
  // get community dat and pass it to client

  try {
    const communityDocRef = doc(
      firestore, 
      'communities', 
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);
    return {
      props: {
        communityData: communityDoc.exists() ? 
        (JSON.parse(
          safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })) 
        ) 
        : "",
      }
    }
  } catch (error) {
    // could add error page here
    console.log('getServerSideProps error', error)
    
  }
}

export default CommunityPage;