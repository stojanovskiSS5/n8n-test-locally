import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

export class HeyReach implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'HeyReach API',
        name: 'HeyReach',
        icon: 'file:heyreach.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Get data from HeyReach API',
        defaults: {
            name: 'HeyReach API',
        },
        inputs: [NodeConnectionType.Main],
        outputs: [NodeConnectionType.Main],
        credentials: [
            {
                name: 'HeyReachApi',
                required: true,
            },
        ],
        requestDefaults: {
            baseURL: 'https://api.nasa.gov',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'Campaign',
                        value: 'campaign',
                    }
                ],
                default: 'campaign',
            },
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: [
                            'campaign',
                        ],
                    },
                },
                options: [
                    {
                        name: 'Get By Id',
                        value: 'getById',
                        action: 'Retrieve a single campaign by ID',
                        description: 'Retrieves a single campaign by its unique identifier.',
                        routing: {
                            request: {
                                method: 'GET',
                                url: '/campaign/GetById',
                                qs: {
                                    campaignId: '={{$parameter["campaignId"]}}',
                                },
                            },
                        },
                    },
                ],
                default: 'getById',
            },
            {
                displayName: 'Campaign ID',
                name: 'campaignId',
                type: 'number',
                required: true,
                displayOptions: {
                    show: {
                        resource: [
                            'campaign',
                        ],
                        operation: [
                            'getById',
                        ],
                    },
                },
                default: 0,
                description: 'The ID of the campaign to retrieve',
            },
        ]
    };
}