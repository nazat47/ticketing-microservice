export const natsWrapper = {
  client: {
    publish: jest
      .fn()
      .mockImplementation(
        (subjct: string, data: string, callback: () => void) => {
          callback();
        }
      ),
  },
};
