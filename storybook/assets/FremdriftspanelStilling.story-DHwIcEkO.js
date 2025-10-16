import{ac as I,ad as w,j as t,R as k,S as j,cn as x,cr as b,aG as g,co as u,aP as y,cD as _}from"./iframe-DSaqXt6k.js";import{w as d,c as A}from"./ContextDecorators-CwgbIuhn.js";import{F as N,A as v}from"./FullførtStilling-CrNsilSf.js";import{R as T}from"./GjenåpneStillingKnapp-12PrwMOs.js";import{T as D}from"./TilgangskontrollForInnhold-DOjPfRQ5.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BOTRWqso.js";import"./OrganisasjonsnummerAlert-CGU6iCGJ.js";import"./VStack-BBGaAluN.js";import"./BasePrimitive-DScZ7IXW.js";import"./List-Kxgz1abr.js";import"./Link-BQw0wl5g.js";import"./KandidatHendelseTag-qSfigkV2.js";import"./Tag-DvfXdsyj.js";import"./FileXMark-emfGFE_I.js";import"./Trash-CvDx4G0h.js";import"./HandShakeHeart-P93Kh6Xn.js";import"./Calendar-CGNbwBba.js";import"./ThumbUp-qmo1UuoF.js";import"./Table-BG52D2qp.js";import"./util-CHnmxlZ0.js";import"./format-BmxTv3ea.js";import"./match-DiZcDwkp.js";import"./parseISO-BJ0UyFM2.js";import"./parse-DLRfWJcq.js";import"./getDefaultOptions-CQHWYkoJ.js";import"./util-CeHb-BPb.js";import"./accordion-BqeUN9Kn.js";import"./index-DjA8OWFh.js";import"./index-nHqslMy1.js";import"./index-DjIJ-FX9.js";import"./ChevronDown-M_cBQkz2.js";import"./Box-5fksin1s.js";import"./Bell-DrwL_7N3.js";import"./PersonChat-CafPeWF9.js";import"./Eye-CQFkw4k8.js";import"./ProgressBar-C4hLQ5kn.js";import"./EyeSlash-CT1I0xYC.js";import"./CircleSlash-m2eEzYVt.js";import"./Modal-Dkw8IqW-.js";import"./floating-ui.react-CSxZyN0A.js";import"./Date.Input-D98g2j24.js";import"./useFormField-DsNUz0eE.js";import"./useControllableState-DAjJj0hK.js";import"./Modal.context-DfRJF0pN.js";import"./Checkbox-CcUWcar5.js";import"./Fieldset-DBqXegKz.js";import"./Pencil-iC1vLkN1.js";import"./PersonbrukerTekst-Bdc2HNrl.js";import"./ClockDashed-Ctt4VK2b.js";import"./Tasklist-B_0GLBsf.js";import"./ErrorBoundary-D4-FRkoB.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,vt as default};
