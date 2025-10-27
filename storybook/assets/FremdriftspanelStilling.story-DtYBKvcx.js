import{av as w,V as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,Y as y,cw as _}from"./iframe-BwFHCbBn.js";import{w as d,c as D}from"./ContextDecorators-DtqRul7U.js";import{F as N,A as v}from"./FullførtStilling-V-crUkSG.js";import{R as T}from"./GjenåpneStillingKnapp-CNtLJFdT.js";import{T as A}from"./TilgangskontrollForInnhold-Dm7G_8wx.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DYAMuCUL.js";import"./OrganisasjonsnummerAlert-DvyXhF_a.js";import"./VStack-K3QKP0V0.js";import"./BasePrimitive-BNXjGdaB.js";import"./List-CSIholbe.js";import"./Link-Cgb5FHMs.js";import"./KandidatHendelseTag-CnT4mVi1.js";import"./Tag-Z37UogoK.js";import"./ChatExclamationmark-DwZK9o6V.js";import"./FileXMark-Fw6QPVxk.js";import"./Trash-Bxm4p4Gt.js";import"./HandShakeHeart-7YVjBE9Y.js";import"./Calendar-E9fxOvDF.js";import"./ThumbUp-BAjF0-nQ.js";import"./Table-VABNjWEw.js";import"./util-DhPaykA3.js";import"./format-BcSMjo4Z.js";import"./match-D7ZttDwi.js";import"./parse-D5JUYnKE.js";import"./getDefaultOptions-C1srR_wH.js";import"./parseISO-CObrnXOb.js";import"./util-e_WnzYIy.js";import"./accordion-DTzZiVtV.js";import"./index-D-VwHCCh.js";import"./index-B_yP-dmC.js";import"./index-BQbdcQp4.js";import"./ChevronDown-_Vl9cyeX.js";import"./Box-Baavk5Z6.js";import"./Bell-BGQqUMrT.js";import"./PersonChat-BpnlaDYC.js";import"./Eye-BRidaqPs.js";import"./ProgressBar-CxfxuTIF.js";import"./EyeSlash-BkrzSAmL.js";import"./CircleSlash-Cd1TWe2b.js";import"./Modal-CcX2UsI9.js";import"./floating-ui.react-DSt_G1Mr.js";import"./Date.Input-Dgmyslsn.js";import"./useFormField-BuJKEgmm.js";import"./useControllableState-CK1iRQ76.js";import"./Modal.context-BNG1La1A.js";import"./Checkbox-Cs5tkHk7.js";import"./Fieldset-BdBwpica.js";import"./Pencil-HvtSnQC8.js";import"./PersonbrukerTekst-BlNODtm5.js";import"./ClockDashed-D-XLH6sB.js";import"./Tasklist-BZoJZzEY.js";import"./ErrorBoundary-RIoNEMMk.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),m=I(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Lt as default};
