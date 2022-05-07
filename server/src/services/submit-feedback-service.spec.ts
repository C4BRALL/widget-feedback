import { SubmitFeedbackService } from "./submit-feedback-service";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
      { create: createFeedbackSpy },
      { sendMail: sendMailSpy }
    )

describe('Submit feedback', () => {
  it('Should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhE',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('Should not be able to submit feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example feedback',
      screenshot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhE',
    })).rejects.toThrow();
  });

  it('Should not be able to submit feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhE',
    })).rejects.toThrow();
  });

  it('Should not be able to submit feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example feedback',
      screenshot: 'test.jpg',
    })).rejects.toThrow();
  });
});