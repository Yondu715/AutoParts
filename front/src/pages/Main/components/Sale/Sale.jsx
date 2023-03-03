import { useSale } from "./useSale";
import { InputBox } from "../../../../components/InputBox/InputBox";
import { StatusError } from "../../../../components/StatusError/StatusError";
import { SubmitButton } from "../../../../components/SubmitButton/SubmitButton";
import styles from "./Sale.module.css"

export function Sale() {

    

    const fields = [
        {
            name: "name",
            nameRu: "Название",
        },
        {
            name: "brand",
            nameRu: "Марка",
        },
        {
            name: "model",
            nameRu: "Модель",
        },
        {
            name: "price",
            nameRu: "Стоимость",
        },
    ];

    const {
        form, handlerForm, error,
        image, _getImage, _asyncSendSaleInfo
    } = useSale();

    return (
        <div className={[styles.sale, "fade"].join(" ")}>
            <div className={styles.saleBlock}>
                <div className={styles.wrapProductInfo}>
                    <div className={styles.productInfo}>
                        {fields.map(({ name, nameRu }) =>
                            <InputBox
                                key={name}
                                labelClass={styles.text}
                                inputClass={styles.inputText}
                                type="text"
                                value={form[name]}
                                name={name}
                                label={nameRu}
                                onChange={handlerForm}
                            />)}
                        <StatusError message={error} />
                    </div>
                </div>
                <div className={styles.productImage}>
                    <div className={styles.dropArea}>
                        <img alt="" src={image ? image : "dragAndDrop.png"}></img>
                    </div>
                    <label className={styles.inputFile}>
                        <span>Выберите файл</span>
                        <input type="file" accept="image\*" onChange={_getImage} />
                    </label>
                </div>
            </div>
            <div>
                <div className={styles.btnPlace}>
                    <SubmitButton content="Выставить на продажу" onClick={_asyncSendSaleInfo} />
                </div>
            </div>
        </div>
    );
}