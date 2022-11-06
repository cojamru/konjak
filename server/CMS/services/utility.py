class UtilityService:
    @staticmethod
    def update_many_to_many(valueORM, values: list, new_values: list):
        """
        Update values list in many_to_many relation

        :param values: values to update
        :param new_values: updated data 
        :return: None
        """

        if not new_values:
            return

        current_values = values
        number_of_values_diff = len(new_values) - len(current_values)

        # update number of valuess
        for _ in range(abs(number_of_values_diff)):
            if number_of_values_diff < 0:
                current_values.remove(current_values[-1])
            elif number_of_values_diff > 0:
                current_values.append(valueORM())

        # update current_values values
        for i in range(len(current_values)):
            for field, value in new_values[i]:
                setattr(current_values[i], field, value)
