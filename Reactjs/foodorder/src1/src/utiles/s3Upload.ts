import ReactS3Client from 'react-aws-s3-typescript';
const config = {
  bucketName: 'owe-assets',
  region: 'ap-southeast-2',
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY!,
};

export default (dir: string = '/assets') =>
  new ReactS3Client({ ...config, dirName: dir });
