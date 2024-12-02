export const FormatType ={
    Percent : 'Percent', // Hiển thị %
    PercentWithValue : 'PercentWithValue', // Hiển thị % và khi chuyền nhận dữ liệu tự động nhân chia 100
    PercentNon : 'PercentNon', //Không hiển thị % và khi chuyền nhận dữ liệu tự động nhân chia 100
    VND : "VND", // Hiển thị tiền VNĐ
    USD : "USD", // Hiển thị tiền USD
    Money: "Money", // Có dấu , phân cách nếu đơn vị tròn nghìn
    Number : "Number", // Định dạng số
    ID: "ID", // MINHDV SSI Định dạng ID, loại này bỏ đi ký tự #, $
    Interger : "Interger", // NVS-longdh Định dạng số nguyên không có phần thập phân
    Negative : "Negative", // NVS-longdh Định dạng số nguyên âm

}
export const DataType = {
    // String type
    String: "STR",

    // Integer type
    Int: "INT",

    // Long type
    Long: "LNG",

    /**
     * #,##0.#
     */
    Double: "DBL",

    /**
     * #,##0
     */
    Double0: "DBL0",

    /**
     * #,##0.#
     */
    Double1: "DBL1",

    /**
     * #,##0.##
     */
    Double2: "DBL2",

    /**
     * #,##0.###
     */
    Double3: "DBL3",

    /**
     * #,##0.####
     */
    Double4: "DBL4",

    /**
     * dd/MM/yyyy
     */
    Date: "DAT",

    /**
     * dd/MM/yyyy
     */
    Date10: "DAT10",

    /**
     * dd/MM/yyyy HH:mm
     */
    Date16: "DAT16",

    /**
     * dd/MM/yyyy HH:mm.ss
     */
    Date19: "DAT19",

    /**
     * dd/MM/yyyy HH:mm:ss.fff
     */
    Date23: "DAT23",

    /**
     * yyyyMMdd stored in Number
     */
    DateNumber: "DATNUM"
};

export const ControlType = {
    /**
     * Combo
     */
    ComBoSelect: "CBM"
}
export const SeparatorMultipleValue = ",";

export const SpaceMultipleValue = ", ";
