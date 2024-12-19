import { APIGatewayProxyResult, SQSEvent, Context } from 'aws-lambda'

export const handler = async (
    event: SQSEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    console.log('Event: ', JSON.stringify(event, null, 2))
    console.log('Context: ', JSON.stringify(context, null, 2));
    for (const record of event.Records) {
        console.log('Message Body: ', record.body)
    }
    return {
        statusCode: 200,
        body: JSON.stringify('Message processed successfully!'),
    }
}
