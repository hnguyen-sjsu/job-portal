import datetime


def string_to_camel_case(snake_str):
    components = snake_str.split('_')
    # We capitalize the first letter of each component except the first one
    # with the 'title' method and join them together.
    return components[0] + ''.join(x.title() for x in components[1:])


def dict_to_camel_case(dict):
    return {string_to_camel_case(key): value for key, value in dict.items()}


def convert_string_to_date(string):
    format = '%Y-%m-%d'
    return datetime.datetime.strptime(string, format).date()
