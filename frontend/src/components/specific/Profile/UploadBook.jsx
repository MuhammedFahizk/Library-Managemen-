import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input, notification, Form, Upload, Row, Col } from 'antd';
import { MdBook } from 'react-icons/md';
import { FaPen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons'; // For upload icon
import { addBook } from '../../../services/postApi';

const UploadBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFinish = async (data) => {
    try {
      // Handle book upload logic here
      const response = await addBook(data);
      notification.success({
        message: 'Book uploaded successfully!',
        description: response.message,
      });
      navigate('/books'); // Redirect to books list page
    } catch (error) {
      notification.error({
        message: 'Upload failed',
        description: error.message,
      });
    }
  };

  const handleImageUpload = (file) => {
    // Custom image validation can be added here
    return false; // Prevent the default file upload behavior, file can be processed later
  };

  return (
    <Form
      className="md:w-[400px] w-[300px] mx-auto"
      style={{ maxWidth: 600 }}
      onFinish={handleSubmit(onFinish)}
    >
      {/* Book Title */}
      <Form.Item
        name="title"
        validateStatus={errors.t ? 'error' : ''}
        help={errors.t ? errors.t.message : ''}
      >
        <Controller
          control={control}
          name="title"
          rules={{
            required: 'Title is required',
          }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Book Title"
              prefix={<MdBook />}
              size="large"
              className="mb-4"
            />
          )}
        />
      </Form.Item>

      {/* Author */}
      <Form.Item
        name="author"
        validateStatus={errors.a ? 'error' : ''}
        help={errors.a ? errors.a.message : ''}
      >
        <Controller
          control={control}
          name="author"
          rules={{
            required: 'Author is required',
          }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Author"
              prefix={<FaPen />}
              size="large"
              className="mb-4"
            />
          )}
        />
      </Form.Item>

      {/* ISBN */}
      <Form.Item
        name="isbn"
        validateStatus={errors.isbn ? 'error' : ''}
        help={errors.isbn ? errors.isbn.message : ''}
      >
        <Controller
          control={control}
          name="isbn"
          rules={{
            required: 'ISBN is required',
            pattern: {
              value: /^[0-9]{13}$/,
              message: 'Invalid ISBN format',
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="ISBN (13 digits)"
              size="large"
              className="mb-4"
            />
          )}
        />
      </Form.Item>

      {/* Publication Year and Available Copies in Single Line */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="pubYear"
            validateStatus={errors.pubYear ? 'error' : ''}
            help={errors.pubYear ? errors.pubYear.message : ''}
          >
            <Controller
              control={control}
              name="pubYear"
              rules={{
                required: 'Publication year is required',
                min: {
                  value: 1000,
                  message: 'Year should be at least 1000',
                },
                max: {
                  value: new Date().getFullYear(),
                  message: `Year should not be greater than ${new Date().getFullYear()}`,
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Publication Year"
                  type="number"
                  size="large"
                  className="mb-4"
                />
              )}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="availableCopies"
            validateStatus={errors.availableCopies ? 'error' : ''}
            help={errors.availableCopies ? errors.availableCopies.message : ''}
          >
            <Controller
              control={control}
              name="availableCopies"
              rules={{
                required: 'Available copies is required',
                min: {
                  value: 1,
                  message: 'There must be at least one copy available',
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Available Copies"
                  type="number"
                  size="large"
                  className="mb-4"
                />
              )}
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Image Upload */}
      <Form.Item
        name="image"
        validateStatus={errors.image ? 'error' : ''}
        help={errors.image ? errors.image.message : ''}
      >
        <Controller
          control={control}
          name="coverImg"
          rules={{
            required: 'Image is required',
          }}
          render={({ field }) => (
            <Upload
              {...field}
              beforeUpload={handleImageUpload}
              listType="picture"
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />} block>
                Upload Book Image
              </Button>
            </Upload>
          )}
        />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" block>
          Upload Book
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UploadBook;
