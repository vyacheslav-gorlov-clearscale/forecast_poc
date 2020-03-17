import os, json
import boto3

forecast_query_client = boto3.client('forecastquery')

forecast_arn = os.environ["FORECAST_ARN"]

def lambda_handler(event, context):
    body = json.loads(event["body"])
    start_date = body["startDate"]
    end_date = body["endDate"]
    item_id = body["itemId"]

    real_time_forecast_response = forecast_query_client.query_forecast(
        ForecastArn=forecast_arn,
        StartDate=start_date,
        EndDate=end_date,
        Filters={
            "item_id" : str(item_id)
        }
    )

    response = {
        "isBase64Encoded": False,
        "statusCode": 200,
        "headers": { },
        "body": json.dumps(real_time_forecast_response)
    }

    return response
