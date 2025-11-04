import{aD as I,M as w,j as t,q as k,S as x,cx as j,cB as b,cD as g,cy as u,P as y,cR as _}from"./iframe-DSdiPFC4.js";import{w as m,c as A}from"./ContextDecorators-2vZvGnDC.js";import{F as N,A as v}from"./FullførtStilling-CwXK_INb.js";import{R as T}from"./GjenåpneStillingKnapp-DBaTPF9R.js";import{T as D}from"./TilgangskontrollForInnhold-uHXGeV7u.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CgGB5biJ.js";import"./OrganisasjonsnummerAlert-CMVFtpnf.js";import"./VStack-BKWn7tAl.js";import"./BasePrimitive-Cc8_GDs4.js";import"./List-D_w4sZva.js";import"./Link-CrwxxI2t.js";import"./KandidatHendelseTag-Da4GVXSl.js";import"./Tag-BKjvMUME.js";import"./ChatExclamationmark-CGmhGL4Y.js";import"./FileXMark-B2tyAkuC.js";import"./Trash-D0HP6bXj.js";import"./HandShakeHeart-D1Qn10_8.js";import"./Calendar-BQUt9BSr.js";import"./ThumbUp-CH6u07Mi.js";import"./Table-DY_fPu8p.js";import"./util-BarDoa7A.js";import"./parse-C7Wk-VNn.js";import"./getDefaultOptions-qYycqK5j.js";import"./parseISO-CPzjlZB_.js";import"./index-CgRHCvDs.js";import"./index-B40KJ5b4.js";import"./isBefore-zdELsJL0.js";import"./util-Boj8vsL6.js";import"./accordion-J7bgF_zG.js";import"./index-CMtVYtDC.js";import"./index-DOBkiPsC.js";import"./index-DZ9uNiE1.js";import"./ChevronDown-ScfmwSwc.js";import"./Box-Bkc7_SCk.js";import"./Bell-SrmNOJe0.js";import"./PersonChat-D0AMNMOP.js";import"./Eye-Dm3fD9KC.js";import"./ProgressBar-DSFcFe7E.js";import"./EyeSlash-Cj9xEnPs.js";import"./CircleSlash-cHCkwhzI.js";import"./Modal-Dr9Gnqvb.js";import"./floating-ui.react-IxecFUMB.js";import"./Date.Input-Ba7efxI3.js";import"./useFormField-B6f4Ik1o.js";import"./useControllableState-CrxLrzqj.js";import"./Modal.context-qHNJI2Qp.js";import"./Checkbox-BQbhvbWv.js";import"./Fieldset-Kz9wz0rk.js";import"./Pencil-iv7TAWb-.js";import"./PersonbrukerTekst-DQpGBk1p.js";import"./ClockDashed-Dv9KM7aC.js";import"./Tasklist-CIpeK50s.js";import"./ErrorBoundary-CeDPWePC.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ut={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Ut as default};
