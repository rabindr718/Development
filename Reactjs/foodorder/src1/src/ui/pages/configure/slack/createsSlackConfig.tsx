import React, { useEffect, useState } from 'react';

import { ReactComponent as CROSS_BUTTON } from '../../../../resources/assets/cross_button.svg';
import Input from '../../../components/text_input/Input';

import { ActionButton } from '../../../components/button/ActionButton';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';

import { validateConfigForm } from '../../../../utiles/configFormValidation';
import { resetSuccess } from '../../../../redux/apiSlice/configSlice/config_get_slice/slackConfigSlice';
import { FormInput } from '../../../../core/models/data_models/typesModel';
import {
  createSlackConfig,
  updateSlackConfig,
} from '../../../../redux/apiActions/config/slackConfigAction';
interface payScheduleProps {
  handleClose: () => void;
  editMode: boolean;
  editData: any;
}

const CreateSlackConfig: React.FC<payScheduleProps> = ({
  handleClose,
  editMode,
  editData,
}) => {
  const dispatch = useAppDispatch();
  const { isSuccess, isFormSubmitting } = useAppSelector(
    (state) => state.slackConfig
  );
  const [createSlackConfigData, setCreateArData] = useState({
    issue_type: editData?.issue_type || '',
    channel_name: editData?.channel_name || '',
    channel_id: editData?.channel_id || '',
    record_id: editData?.record_id || '',
    bot_token: editData?.bot_token || '',
    slack_app_token: editData?.slack_app_token || '',
  });
  const [newFormData, setNewFormData] = useState<any>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: FormInput) => {
    const { name, value } = e.target;
    setCreateArData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationRules: { [key: string]: any } = {
      issue_type: [
        {
          condition: (value: any) => !!value,
          message: 'Issue type is required',
        },
      ],
      channel_name: [
        {
          condition: (value: any) => !!value,
          message: 'Channel name is required',
        },
      ],
      channel_id: [
        {
          condition: (value: any) => !!value,
          message: 'Channel ID is required',
        },
      ],
      bot_token: [
        {
          condition: (value: any) => !!value,
          message: 'Bot token is required',
        },
      ],
      slack_app_token: [
        {
          condition: (value: any) => !!value,
          message: 'Slack app token is required',
        },
      ],
    };
    if (editMode) {
      validationRules.record_id = [
        {
          condition: (value: any) => !!value,
          message: 'Unique Id is required',
        },
      ];
    }
    const { isValid, errors } = validateConfigForm(
      createSlackConfigData!,
      validationRules
    );
    if (!isValid) {
      setErrors(errors);
      return;
    }

    if (editMode) {
      dispatch(
        updateSlackConfig({
          ...createSlackConfigData,
          issue_type: createSlackConfigData.issue_type,
          channel_name: createSlackConfigData.channel_name,
          channel_id: createSlackConfigData.channel_id,
          bot_token: createSlackConfigData.bot_token,
          slack_app_token: createSlackConfigData.slack_app_token,
        })
      );
    } else {
      dispatch(
        createSlackConfig({
          issue_type: createSlackConfigData.issue_type,
          channel_name: createSlackConfigData.channel_name,
          channel_id: createSlackConfigData.channel_id,
          bot_token: createSlackConfigData.bot_token,
          slack_app_token: createSlackConfigData.slack_app_token,
        })
      );
    }
  };

  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
    return () => {
      isSuccess && dispatch(resetSuccess());
    };
  }, [isSuccess]);

  return (
    <div className="transparent-model">
      <form className="modal" onSubmit={handleSubmit}>
        <div className="createUserCrossButton" onClick={handleClose}>
          <CROSS_BUTTON />
        </div>

        <h3 className="createProfileText">
          {editMode === false ? 'Create Slack Config' : 'Update Slack Config'}
        </h3>

        <div className="modal-body">
          <div className="createProfileInputView">
            <div className="createProfileTextView">
              <div className="create-input-container">
                <div className="create-input-field">
                  <Input
                    type={'text'}
                    label="Channel Type"
                    value={createSlackConfigData.issue_type}
                    name="issue_type"
                    placeholder={'Enter channel type'}
                    onChange={(e) => handleInputChange(e)}
                  />
                  {errors.issue_type && (
                    <span className="error">{errors.issue_type}</span>
                  )}
                </div>

                <div className="create-input-field">
                  <Input
                    type={'text'}
                    label="Channel Description"
                    value={createSlackConfigData.channel_name}
                    name="channel_name"
                    placeholder={'Enter channel description'}
                    onChange={(e) => handleInputChange(e)}
                  />
                  {errors.channel_name && (
                    <span className="error">{errors.channel_name}</span>
                  )}
                </div>

                <div className="create-input-field">
                  <Input
                    type={'text'}
                    label="Channel ID"
                    value={createSlackConfigData.channel_id}
                    name="channel_id"
                    placeholder={'Enter channel ID'}
                    onChange={(e) => handleInputChange(e)}
                  />
                  {errors.channel_id && (
                    <span className="error">{errors.channel_id}</span>
                  )}
                </div>
              </div>
              <div className="create-input-container">
                <div className="create-input-field">
                  <Input
                    type={'text'}
                    label="Bot token"
                    value={createSlackConfigData.bot_token}
                    name="bot_token"
                    placeholder={'Enter bot token'}
                    onChange={(e) => handleInputChange(e)}
                  />
                  {errors.bot_token && (
                    <span className="error">{errors.bot_token}</span>
                  )}
                </div>

                <div className="create-input-field">
                  <Input
                    type={'text'}
                    label="Slack App token"
                    value={createSlackConfigData.slack_app_token}
                    name="slack_app_token"
                    placeholder={'Enter slack app token'}
                    onChange={(e) => handleInputChange(e)}
                  />
                  {errors.slack_app_token && (
                    <span className="error">{errors.slack_app_token}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="createUserActionButton">
          <ActionButton
            title={'Cancel'}
            type="reset"
            onClick={() => handleClose()}
          />
          <ActionButton
            title={editMode === false ? 'Save' : 'Update'}
            type="submit"
            disabled={isFormSubmitting}
            onClick={() => {}}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateSlackConfig;
