import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

interface CreateProposalProps {
  onClose: () => void; // Prop to close the component/modal
}

const CreateProposal: React.FC<CreateProposalProps> = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [proposalLink, setProposalLink] = useState('');
  const [error, setError] = useState('');

  // Function to create project, design, and proposal in sequence
  const handleCreateProposal = async () => {
    setLoading(true);
    setError('');

    try {
      // Create Project
      const projectResponse = await axios.post(
        'http://localhost:5000/api/create-project',
        {
          project: {
            location: {
              latitude: 37.77960043,
              longitude: -122.39530086,
            },
            external_provider_id: 'YourId123',
            name: 'My first test project',
            customer_salutation: 'Mrs.',
            customer_first_name: 'Jane',
            customer_last_name: 'Doe',
            mailing_address: '434 Brannan St, San Francisco, CA, USA',
            customer_email: 'jane@example.com',
            customer_phone: '(555) 111-5151',
            status: 'Remote Assessment Completed',
            preferred_solar_modules: ['5b8c975b-b114-4d31-9d40-c44a6cfbe383'],
            tags: ['third_party_1'],
          },
        }
      );
      const projectId = projectResponse.data.project.id;

      // Create Design
      const designResponse = await axios.post(
        'http://localhost:5000/api/create-design',
        {
          design: {
            external_provider_id: 'YourId123',
            project_id: projectId,
            name: `Mydesign${projectId}`,
          },
        }
      );
      const designId = designResponse.data.design.id;

      // Create Proposal
      const proposalResponse = await axios.post(
        'http://localhost:5000/api/create-proposal',
        { designId }
      );
      setProposalLink(proposalResponse.data.proposal.proposal_link);
      toast.success('Proposal created successfully'); // Notify success

      // Optionally, you can redirect to the proposal URL in an iframe or a new tab
      window.open(proposalResponse.data.proposal.proposal_link, '_blank');

      // Close the component/modal after success
      onClose();
    } catch (error) {
      const err = error as any; // Type assertion to 'any'
      console.error(
        'Error during proposal creation:',
        err.response?.data || err.message
      );
      setError(
        `Error during proposal creation: ${err.response?.data?.message || err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Proposal</h2>
      <button onClick={handleCreateProposal} disabled={loading}>
        {loading ? 'Creating Proposal...' : 'Create Proposal'}
      </button>
      {proposalLink && (
        <p>
          Proposal Link:{' '}
          <a href={proposalLink} target="_blank" rel="noopener noreferrer">
            {proposalLink}
          </a>
        </p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CreateProposal;
