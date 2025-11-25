import{av as I,T as w,j as t,x as k,S as x,cy as j,cG as b,cF as g,cz as u,X as y,c_ as _}from"./iframe-BQ1incyN.js";import{w as m,c as D}from"./ContextDecorators-nyw5vzQY.js";import{F as N,A as v}from"./FullførtStilling-4MddyGi6.js";import{R as T}from"./GjenåpneStillingKnapp--mbyf7_K.js";import{T as A}from"./TilgangskontrollForInnhold-DfgO1U-q.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DoO6N6oX.js";import"./OrganisasjonsnummerAlert-Cs86EzpO.js";import"./VStack-CvGDILKu.js";import"./BasePrimitive-Dp_sZ_R1.js";import"./List-D5JbiyOp.js";import"./Link-Cat3nivg.js";import"./KandidatHendelseTag-Ao-jlGQL.js";import"./Tag-gSVS37K-.js";import"./ChatExclamationmark-BNLsPpWq.js";import"./FileXMark-TcpzfMVv.js";import"./Trash-DsI7uFmt.js";import"./HandShakeHeart-BhbsEHFh.js";import"./Calendar-BuzM5afZ.js";import"./ThumbUp-n9uTjeI6.js";import"./Table-CgI_5wIF.js";import"./index-CVFFzUnD.js";import"./index-B40KJ5b4.js";import"./util-DeXtxzd9.js";import"./DatoVelger-1nxLmMig.js";import"./useDatepicker-X6-JdHoU.js";import"./useControllableState-BQTyOv-Y.js";import"./Modal-Basqz_A0.js";import"./floating-ui.react-Db4ep1Lb.js";import"./Date.Input-Clh3TNqh.js";import"./useFormField-BJ9N13rj.js";import"./ChevronDown-DFqnftke.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BWyBD_to.js";import"./Modal.context-BQ3LJgn_.js";import"./Popover-BSQcvOJK.js";import"./DismissableLayer-CujSqPxa.js";import"./startOfMonth-DhFvHZq0.js";import"./Select-CJwX0BP7.js";import"./endOfMonth-DsGTrKX2.js";import"./ArrowLeft-CCriJm5m.js";import"./ArrowRight-BvBXNE2d.js";import"./isSameDay-DgKJdteO.js";import"./Checkbox-BDzM6iJ5.js";import"./Fieldset-23wrC0RT.js";import"./accordion-CZHcleIW.js";import"./index-M9r8iBC_.js";import"./index-DUgfXAXy.js";import"./index-CsS6HfLp.js";import"./Box-CUduzxP4.js";import"./Bell-BHE3_3j7.js";import"./PersonChat-CMPrZQR7.js";import"./Eye-Bq6pJ23W.js";import"./ProgressBar-gPlxChTc.js";import"./useLatestRef-DNBUtRbr.js";import"./EyeSlash-CLJwaldZ.js";import"./CircleSlash-D0jSrb4D.js";import"./Pencil-CPy6frH1.js";import"./FullførStillingModal-BGmaHfEz.js";import"./PersonbrukerTekst-DudrM1v2.js";import"./ClockDashed-XsZwcbri.js";import"./umamiEvents-CYDHrNFb.js";import"./Tasklist-DJXX4QY8.js";import"./ErrorBoundary-BQTg2lSI.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ht={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Ht as default};
