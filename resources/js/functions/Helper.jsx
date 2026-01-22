export const customStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: "45px",
            borderRadius: "8px",
            borderColor: state.isFocused ? "#2563eb" : "#000",
            boxShadow: "none",
            "&:hover": {
                border:"2px solid #2563eb",
                borderColor: "#2563eb",
            },
        }),

        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
                ? "#000"
                : state.isFocused
                  ? "#f3f4f6"
                  : "#fff",
            color: state.isSelected ? "#fff" : "#000",
            cursor: "pointer",
        }),
    };