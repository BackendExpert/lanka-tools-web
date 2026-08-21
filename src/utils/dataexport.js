export const exportToCSV = (data, columns, filename = "export.csv") => {
    if (!data?.length) return;

    const headers = columns.map(col => col.header);

    const rows = data.map(item =>
        columns.map(col => {
            let value;

            if (typeof col.value === "function") {
                value = col.value(item);
            } else {
                value = col.value
                    .split(".")
                    .reduce((obj, key) => obj?.[key], item);
            }

            if (value === null || value === undefined) value = "";

            value = String(value).replace(/"/g, '""');

            return `"${value}"`;
        }).join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();

    URL.revokeObjectURL(link.href);
};