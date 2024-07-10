export default {
   formatRowHighlight: function(status: string): string {
        // Your logic for rowHighlight goes here
        if (status === "AI Proposal") {
            return "Error";
        } else if (status === "In Progress") {
            return "Warning";
        } else if (status === "Done") {
            return "Success";
        }
        return "Success";
    }
}