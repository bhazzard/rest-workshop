var forms = require('forms'),
    fields = forms.fields,
    validators = forms.fields;

exports = forms.create({
    username: fields.string({ required: true }),
    password: fields.password({ required: true })
});