import {
    DataFormEditorType,
    PropertyGroup,
    DataFormGridLayout,

} from "nativescript-ui-dataform";

export default class CustomerMetaData {
    isReadOnly: string
    commitMode: string
    validationMode: string
    propertyAnnotations: object

    constructor() {
        this.isReadOnly = 'false'
        this.commitMode = 'Immediate'
        this.validationMode = 'Manual'
        this.propertyAnnotations = [
            {
                name: 'id',
                ignore: true
            },
            {
                name: 'first_name',
                displayName: 'First Name',
                hintText: '',
                editor: DataFormEditorType.Text,
                //imageResource: "res://ic_dataform_guest",
                validators:
                    [
                        {
                            name: 'NonEmpty',
                            params:
                            {
                                errorMessage: "Required"
                            }
                        }
                    ]
            },
            {
                name: 'last_name',
                displayName: 'Last Name',
                hintText: '',
                editor: DataFormEditorType.Text,
                //imageResource:"res://ic_email",
                validators:
                    [
                        {
                            name: 'NonEmpty',
                            params:
                            {
                                errorMessage: "Required"
                            }
                        }
                    ]
            },
        ]
    }
}
