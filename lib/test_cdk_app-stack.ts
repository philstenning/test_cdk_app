import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { Queue } from 'aws-cdk-lib/aws-sqs'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { Bucket, CfnBucket, EventType } from 'aws-cdk-lib/aws-s3'
import { SqsDestination } from 'aws-cdk-lib/aws-s3-notifications'
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources'


export class TestCdkAppStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props)

        const leavl1Bucket = new CfnBucket(this, 'MyFirstL1Bucket', {
            versioningConfiguration: {
                status: 'Enabled',
            },
        })

        const level2Bucket = new Bucket(this, 'MyFirstL2Bucket', {
            versioned: true,
            bucketName: 'test-cdk-app-bucket-2',
            // publicReadAccess: true,
        })

        const queue = new Queue(this, 'myFirstQueue', {
            queueName: 'test-cdk-app-queue',
        })

        level2Bucket.addEventNotification(
            EventType.OBJECT_CREATED,
            new SqsDestination(queue)
        )


        const lambdaFunction = new lambda.Function(this, 'TestCdkAppLambda', {
        runtime: lambda.Runtime.NODEJS_22_X,
        handler: 'index.handler',
        code: lambda.Code.fromAsset('lambda'),

        
        
        });

        lambdaFunction.addEventSource(new SqsEventSource(queue));
    }
  
}
// }
